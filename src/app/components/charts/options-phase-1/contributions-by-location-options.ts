import type { DatasetOption } from 'echarts/types/dist/shared.js';
import type {
  BarSeriesOption,
  ComposeOption,
  DatasetComponentOption,
  TooltipComponentOption,
} from 'echarts';
import { getCompactFormattedCurrency } from '../../../public/util/number-formatter';

type ContributionsByLocationComparisonOptions = ComposeOption<
  | BarSeriesOption
  | DatasetComponentOption
  | TooltipComponentOption
  | DatasetOption
>;

type CandidateInOutCityNonItemized = {
  candidateId: string;
  candidateName: string;
  inCity: number;
  outCity: number;
  nonItemized: number;
};

export function getContributionsByInOutCityNonItemized({
  candidateSeries,
}: {
  candidateSeries: CandidateInOutCityNonItemized[];
}) {
  console.log('getContributionsByInOutCityNonItemized - called');

  const chartOptions: ContributionsByLocationComparisonOptions = {
    legend: {
      top: '0%',
      selectedMode: false,
    },
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        const c = params.data as CandidateInOutCityNonItemized;

        const keyFieldName = params.dimensionNames[params.seriesIndex + 1];
        const fieldValue = params.value[keyFieldName];

        const stackTotal = c.inCity + c.outCity + c.nonItemized;
        const percent = ((fieldValue / stackTotal) * 100).toFixed(1) + '%';

        return `${params.marker} ${percent}`;
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
      dimensions: ['candidateName', 'inCity', 'outCity', 'nonItemized'],
      source: candidateSeries,
    },
    xAxis: {
      type: 'value',
    },
    yAxis: {
      type: 'category',
      encode: { y: 'candidateName' },
    },
    series: [
      {
        name: 'In City',
        type: 'bar',
        barWidth: 25,
        stack: 'total',
        itemStyle: { color: '#2B4E76' },
        encode: { x: 'inCity', y: 'candidateName' },
      },
      {
        name: 'Out of City',
        type: 'bar',
        barWidth: 25,
        stack: 'total',
        itemStyle: { color: '#5A90DC' },
        encode: { x: 'outCity', y: 'candidateName' },
      },
      {
        name: 'Unspecified (<$100)',
        type: 'bar',
        barWidth: 25,
        stack: 'total',
        itemStyle: { color: '#ABC7F9' },
        encode: { x: 'nonItemized', y: 'candidateName' },
      },
    ],
  };

  return chartOptions;
}

type CandidateInOutCity = {
  candidateId: string;
  candidateName: string;
  inCity: number;
  outCity: number;
};

export function getContributionsByInOutCity({
  candidateSeries,
}: {
  candidateSeries: CandidateInOutCity[];
}) {
  console.log('getContributionsByInOutCityNonItemized - called');

  const chartOptions: ContributionsByLocationComparisonOptions = {
    legend: {
      top: '0%',
      selectedMode: false,
    },
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        const candidate = params.data as CandidateInOutCity;

        const keyFieldName = params.dimensionNames[params.seriesIndex + 1];
        const fieldValue = params.value[keyFieldName];

        const stackTotal = candidate.inCity + candidate.outCity;
        const percent = ((fieldValue / stackTotal) * 100).toFixed(1) + '%';

        return `${params.marker} ${percent}`;
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
      dimensions: ['candidateName', 'inCity', 'outCity', 'nonItemized'],
      source: candidateSeries,
    },
    xAxis: {
      type: 'value',
      axisLabel: {
        formatter: (value: number) =>
          getCompactFormattedCurrency(Math.abs(value)),
      },
    },
    yAxis: {
      type: 'category',
      encode: { y: 'candidateName' },
      triggerEvent: true, // enable events for labels
      axisLabel: {
        cursor: 'pointer',
      },
    },
    series: [
      {
        name: 'In City',
        type: 'bar',
        barWidth: 25,
        stack: 'total',
        itemStyle: { color: '#2B4E76' },
        encode: { x: 'inCity', y: 'candidateName' },
      },
      {
        name: 'Out of City',
        type: 'bar',
        barWidth: 25,
        stack: 'total',
        itemStyle: { color: '#5A90DC' },
        encode: { x: 'outCity', y: 'candidateName' },
      },
    ],
  };

  return chartOptions;
}
