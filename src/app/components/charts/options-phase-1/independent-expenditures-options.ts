import type {
  BarSeriesOption,
  ComposeOption,
  LineSeriesOption,
  TooltipComponentOption,
} from 'echarts';
import { getCompactFormattedCurrency } from '../../../public/util/number-formatter';

type SupportedVsOpposedComparisonOptions = ComposeOption<
  BarSeriesOption | LineSeriesOption | TooltipComponentOption
>;

type IndependentExpenditureFiler = {
  filerName: string;
  amount: number;
};

export type CandidateSupportedVsOpposed = {
  candidateId: string;
  candidateName: string;
  support: IndependentExpenditureFiler[];
  oppose: IndependentExpenditureFiler[];
};

function getNiceInterval(maxVal: number, desiredTicks = 5) {
  if (maxVal === 0) return 1;

  // Find the rough interval
  const rawInterval = maxVal / desiredTicks;
  // Find the power of 10 (e.g., 100, 10, 1, 0.1)
  const exponent = Math.floor(Math.log10(rawInterval));
  const fraction = rawInterval / Math.pow(10, exponent);

  let niceFraction;
  if (fraction < 1.5) niceFraction = 1;
  else if (fraction < 3) niceFraction = 2;
  else if (fraction < 7) niceFraction = 5;
  else niceFraction = 10;

  return niceFraction * Math.pow(10, exponent);
}

// used to increase the space between the stack label (amount) and the candidate names on the left of the chart
const boundaryMultiplier = 1.025;

export function getSupportedVsOpposedComparison({
  candidateSeries,
}: {
  candidateSeries: CandidateSupportedVsOpposed[];
}) {
  const maxSupport = Math.max(...candidateSeries.map((c) => c.support.length));
  const maxOppose = Math.max(...candidateSeries.map((c) => c.oppose.length));
  const supportColors = ['#316238', '#54A465']; // Alternating Support
  const opposeColors = ['#AA2E26', '#EB422F']; // Alternating Oppose
  const series: BarSeriesOption[] = [];

  // Build Support Series
  for (let i = 0; i < maxSupport; i++) {
    series.push({
      type: 'bar',
      stack: 'total',
      data: candidateSeries.map((candidate) => {
        const item = candidate.support[i];
        return item
          ? {
              value: item.amount,
              filerName: item.filerName, // Custom property for tooltip
              itemStyle: { color: supportColors[i % 2] },
            }
          : 0;
      }),
    });
  }

  // Support Totals (Attached to the 0-point at the END of the stack)
  const supportTotals = candidateSeries.map((candidate) =>
    candidate.support.reduce((sum, item) => sum + item.amount, 0),
  );

  series.push({
    type: 'bar',
    stack: 'total', // Keep in the same stack
    data: supportTotals.map((v) => ({
      value: 0, // Zero width means no gap
      label: {
        show: v > 0,
        position: 'right', // Label moves right from the 0-width point
        fontWeight: 'bold',
        formatter: () => `${getCompactFormattedCurrency(v, 1)}`,
        distance: 5, // Manually control the small gap from the bar
      },
    })),
    itemStyle: { color: 'rgba(0,0,0,0)' }, // Fully transparent
  });

  // Build Oppose Series (Negative values)
  for (let i = 0; i < maxOppose; i++) {
    series.push({
      type: 'bar',
      stack: 'total',
      data: candidateSeries.map((candidate) => {
        const item = candidate.oppose[i];
        return item
          ? {
              value: -item.amount,
              filerName: item.filerName,
              itemStyle: { color: opposeColors[i % 2] },
            }
          : 0;
      }),
    });
  }

  // Calculate Totals for every candidate
  const opposeTotals = candidateSeries.map((candidate) =>
    candidate.oppose.reduce((sum, item) => sum + item.amount, 0),
  );

  // Oppose Totals
  series.push({
    type: 'bar',
    stack: 'total',
    data: opposeTotals.map((v) => ({
      value: 0,
      label: {
        show: v > 0,
        position: 'left', // Label moves left from the 0-width point
        fontWeight: 'bold',
        formatter: () => `${getCompactFormattedCurrency(v, 1)}`,
        distance: 5,
      },
    })),
    itemStyle: { color: 'rgba(0,0,0,0)' },
  });

  const maxDataValue2 =
    Math.max(...opposeTotals, ...supportTotals) * boundaryMultiplier;
  const interval = getNiceInterval(maxDataValue2); // Choose based on your scale
  const boundary = Math.ceil(maxDataValue2 / interval) * interval;

  const chartOption: SupportedVsOpposedComparisonOptions = {
    legend: {
      top: '0%',
      selectedMode: false,
      data: [
        {
          name: 'In Opposition',
          icon: 'roundRect', // set to override line icon set in series
        },
        {
          name: 'In Support',
          icon: 'roundRect', // set to override line icon set in series
        },
      ],
    },
    tooltip: {
      trigger: 'item',
      extraCssText:
        'max-width: 300px; white-space: normal; word-wrap: break-word;',

      formatter: (params: any) => {
        const { data } = params;
        if (!data || !data.filerName) return '';

        return `${data.filerName}: $${Math.abs(params.value).toLocaleString()}`;
      },
    },
    grid: {
      left: '3%', // Increase if candidate names are long
      right: '10%', // Increase to prevent total labels from clipping
      bottom: '3%',
      top: '60px',
      containLabel: true,
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        formatter: (value: number) =>
          getCompactFormattedCurrency(Math.abs(value), 1),
      },
      min: -boundary,
      max: boundary,
      interval,
    },
    yAxis: {
      containLabel: true,
      type: 'category',
      data: candidateSeries.map((c) => c.candidateName),
      triggerEvent: true, // enable events for labels
      axisLabel: {
        cursor: 'pointer',
      },
      axisTick: { show: false },
    },
    series: [
      {
        name: 'In Opposition',
        type: 'line', // set to line so that series does not take up space
        itemStyle: { color: opposeColors[0] }, // Manually set the color
      },
      {
        name: 'In Support',
        type: 'line', // set to line so that series does not take up space
        itemStyle: { color: supportColors[0] }, // Manually set the color
      },
      ...series,
    ],
  };

  return chartOption;
}
