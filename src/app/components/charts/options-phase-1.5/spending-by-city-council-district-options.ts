import type {
  BarSeriesOption,
  ComposeOption,
  LineSeriesOption,
  TooltipComponentOption,
} from 'echarts';
import { getCompactFormattedCurrency } from '../../../public/util/number-formatter';

type ChartsOptions = ComposeOption<
  BarSeriesOption | LineSeriesOption | TooltipComponentOption
>;

type CityCouncilDistrict = {
  districtName: string;
  contributions: number;
  independentExpenditures: number;
  totalSpending: number;
};

/**
 * When using tooltipAxisLabelSeriesName provide event
 * handlers to the chart wrapper component.
 */
export function getContributionsByCityCouncilDistricts({
  districtSeries,
  tooltipAxisLabelSeriesName,
}: {
  districtSeries: CityCouncilDistrict[];
  tooltipAxisLabelSeriesName?: string;
}) {
  const totals = districtSeries.map((district) => district.totalSpending);
  const maxTotal = Math.max(...totals);
  const stackLabelVisibilityThresholdPercent = 0.01;

  const chartOptions: ChartsOptions = {
    legend: {
      top: '0%',
      selectedMode: false,
      data: ['Contributions', 'Independent Expenditures'],
    },
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        const c = params.data as CityCouncilDistrict;

        if (params.seriesName === tooltipAxisLabelSeriesName) {
          return `Click to view District ${params.data.districtNumber} details`;
        }

        const seriesName = params.seriesName;
        const keyFieldName = params.dimensionNames[params.seriesIndex + 1];
        const fieldValue = params.value[keyFieldName];
        const formatted = getCompactFormattedCurrency(Math.abs(fieldValue), 1);

        return `${c.districtName} - ${seriesName}: ${formatted}`;
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '60px',
      containLabel: true,
    },
    dataset: {
      dimensions: [
        'districtName',
        'contributions',
        'independentExpenditures',
        'totalSpending',
      ],
      source: districtSeries,
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        hideOverlap: true,
        formatter: (value: number) => {
          return getCompactFormattedCurrency(Math.abs(value), 1);
        },
      },
    },
    yAxis: {
      type: 'category',
      encode: { y: 'districtName' },
      triggerEvent: true, // enable events for labels
      axisLabel: {
        cursor: 'pointer',
        color: '#0077FF', // district name label
      },
    },
    series: [
      {
        name: 'Contributions',
        type: 'bar',
        barWidth: 25,
        stack: 'total',
        itemStyle: { color: '#2B4E76' },
        encode: { x: 'contributions', y: 'districtName' },
        label: {
          show: true,
          position: 'inside',
          formatter: (params) => {
            const c = params.data as CityCouncilDistrict;
            const stackTotal = c.contributions;

            if (stackTotal / maxTotal < stackLabelVisibilityThresholdPercent)
              return '';

            return getCompactFormattedCurrency(Math.abs(stackTotal), 1);
          },
        },
        labelLayout: {
          hideOverlap: true,
        },
      },
      {
        name: 'Independent Expenditures',
        type: 'bar',
        barWidth: 25,
        stack: 'total',
        itemStyle: { color: '#5A90DC' },
        encode: { x: 'independentExpenditures', y: 'districtName' },
        label: {
          show: true,
          position: 'inside',
          formatter: (params) => {
            const c = params.data as CityCouncilDistrict;
            const stackTotal = c.independentExpenditures;

            if (stackTotal / maxTotal < stackLabelVisibilityThresholdPercent)
              return '';

            return getCompactFormattedCurrency(Math.abs(stackTotal), 1);
          },
        },
        labelLayout: {
          hideOverlap: true,
        },
      },

      // Hidden series for showing stack total labels to the right of last bar
      {
        name: 'Total',
        type: 'bar',
        barWidth: 25,
        // the barGap with stack not set is needed to shift the label into place
        barGap: '-100%',
        itemStyle: { color: 'none' }, // makes the bar invisible
        silent: true, // disable tooltip
        encode: { x: 'totalSpending', y: 'districtName' },
        label: {
          show: true,
          position: 'right', // place label to the right of the last stack
          formatter: (params) => {
            const c = params.data as CityCouncilDistrict;

            return getCompactFormattedCurrency(Math.abs(c.totalSpending), 1);
          },
        },
      },

      // Hidden series used to show tooltips on the axis labels,
      // i.e. the Districts, 'District 2', 'District 4', ...
      ...(tooltipAxisLabelSeriesName
        ? [
            {
              name: tooltipAxisLabelSeriesName,
              type: 'bar' as const,
              barWidth: 25,
              stack: 'none', // do not stack it with the other stack
              silent: true,
              itemStyle: { color: 'none' }, // makes the bar invisible
              encode: { x: 'totalSpending', y: 'districtName' }, // encode needed but series not displayed
            },
          ]
        : []),
    ],
  };

  return chartOptions;
}
