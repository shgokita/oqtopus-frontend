import ReactApexChart from 'react-apexcharts';
import { Spacer } from '@/pages/_components/Spacer';

interface HistogramInfoProps {
  categories: string[];
  data: number[];
  height: number;
}

export const Histogram: React.FC<HistogramInfoProps> = (histogramInfo: HistogramInfoProps) => {
  const state = {
    series: [
      {
        name: 'Frequency',
        data: histogramInfo.data,
      },
    ],
    options: {
      plotOptions: {},
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: histogramInfo.categories,
        position: 'bottom',
        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
    },
  };

  if (histogramInfo.data.length === 0 || histogramInfo.categories.length === 0) {
    return (
      <div>
        <div id="chart">
          <p>Input is invalid.</p>
        </div>
        <div id="html-dist"></div>
      </div>
    );
  }

  return (
    <>
      <div>
        <Spacer className="h-2" />
        <ReactApexChart
          series={state.series}
          options={state.options}
          type="bar"
          height={histogramInfo.height}
        />
        <div id="html-dist"></div>
      </div>
    </>
  );
};
