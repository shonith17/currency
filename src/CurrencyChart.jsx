import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { DateTime } from 'luxon';

const CurrencyChart = (props) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null); // Added chart instance ref

  useEffect(() => {
    const baseCurrency = props.base;
    const targetCurrency = props.target;
    getHistoricalRates(baseCurrency, targetCurrency);
  }, []);

  const getHistoricalRates = (base, quote) => {
    const endDate = DateTime.local().toISODate();
    const startDate = DateTime.local().minus({ days: 30 }).toISODate();

    fetch(`https://api.frankfurter.app/${startDate}..${endDate}?from=${base}&to=${quote}`)
      .then(resp => {
        if (!resp.ok) {
          throw new Error('Network response was not ok');
        }
        return resp.json();
      })
      .then(data => {
        const chartLabels = Object.keys(data.rates);
        const chartData = Object.values(data.rates).map(rate => rate[quote]);
        const chartLabel = `${base}/${quote}`;
        console.log(chartRef.current)
        buildChart(chartLabels, chartData, chartLabel);
      })
      .catch(error => {
        console.error(error.message);
      });
  };

  const buildChart = (labels, data, label) => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy(); // Destroy previous chart instance
    }


    const chartRefCurrent = chartRef.current.getContext('2d');
    chartInstanceRef.current = new Chart(chartRefCurrent, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: label,
            data,
            fill: false,
            tension: 0,
            borderColor: 'blue',
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  };

  return (
    <div className="chart-container">
      <canvas ref={chartRef} id="hello" />
    </div>
  );
};

export default CurrencyChart;

