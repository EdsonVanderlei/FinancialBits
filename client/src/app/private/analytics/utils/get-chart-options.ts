import { CurrencyPipe } from '@angular/common';
import { inject } from '@angular/core';
import { Chart, ChartOptions } from 'chart.js';

export const getChartOptions = (surfaceBorder: string): ChartOptions<'line'> => {
  const currencyPipe = inject(CurrencyPipe);
  return {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: { display: false },
      tooltip: {
        bodyAlign: 'right',
        titleAlign: 'center',
        callbacks: {
          label: (tooltipItem) =>
            `${tooltipItem.dataset.label}: ${currencyPipe.transform(tooltipItem.raw?.toString())}`,
        },
      },
    },
    onHover: (ev, el, chart) => drawVerticalLine(surfaceBorder, chart),
    scales: {
      x: {
        grid: { display: false },
        ticks: { maxTicksLimit: 7 },
      },
      y: {
        grid: { color: surfaceBorder },
        ticks: { display: false },
      },
    },
  };
};

const drawVerticalLine = (surfaceBorder: string, chart: Chart) => {
  const ctx = chart.ctx;
  const top = chart.chartArea.top;
  const bottom = chart.chartArea.bottom;
  ctx.save();
  chart.getDatasetMeta(0).data.forEach((point) => {
    if (point.active) {
      ctx.beginPath();
      ctx.strokeStyle = surfaceBorder;
      ctx.moveTo(point.x, top);
      ctx.lineTo(point.x, bottom);
      ctx.stroke();
      ctx.closePath();
    }
  });
};
