import type { DatasetOption } from 'echarts/types/dist/shared.js';
import {
  type BarSeriesOption,
  type ComposeOption,
  type DatasetComponentOption,
  type TooltipComponentOption,
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
        hideOverlap: true,
        formatter: (value: number) =>
          getCompactFormattedCurrency(Math.abs(value), 1),
      },
    },
    yAxis: {
      type: 'category',
      encode: { y: 'candidateName' },
      triggerEvent: true, // enable events for labels
      axisLabel: {
        cursor: 'pointer',
        color: '#0077FF', // candidate name label
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

type CandidateInOutCityParty = {
  candidateId: string;
  candidateName: string;
  inCity: number;
  outCity: number;
  politicalParty: number;
  totalContributions: number;
};

export function getContributionsByInOutCityParty({
  candidateSeries,
}: {
  candidateSeries: CandidateInOutCityParty[];
}) {
  const chartOptions: ContributionsByLocationComparisonOptions = {
    legend: {
      top: '0%',
      selectedMode: false,
    },
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        const keyFieldName = params.dimensionNames[params.seriesIndex + 1];
        const fieldValue = params.value[keyFieldName];
        const formatted = getCompactFormattedCurrency(Math.abs(fieldValue), 1);
        return `${params.marker} ${formatted}`;
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
      dimensions: ['candidateName', 'inCity', 'outCity', 'politicalParty'],
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
        name: 'In City (non-party)',
        type: 'bar',
        barWidth: 25,
        stack: 'total',
        itemStyle: { color: '#2B4E76' },
        encode: { x: 'inCity', y: 'candidateName' },
      },
      {
        name: 'Out of City (non-party)',
        type: 'bar',
        barWidth: 25,
        stack: 'total',
        itemStyle: { color: '#5A90DC' },
        encode: { x: 'outCity', y: 'candidateName' },
      },
      {
        name: 'Political Party',
        type: 'bar',
        barWidth: 25,
        stack: 'total',
        itemStyle: { color: '#ABC7F9' },
        encode: { x: 'politicalParty', y: 'candidateName' },
        label: {
          show: true,
          position: 'right',
          color: '#000', // change
          fontWeight: 'bold', // change
          formatter: (params) => {
            const record = candidateSeries[params.dataIndex];

            return getCompactFormattedCurrency(
              Math.abs(record.totalContributions),
              1,
            );
          },
        },
      },
    ],
  };

  return chartOptions;
}
