import React, { useState, useEffect, useRef, useCallback } from 'react';
import Chart from 'chart.js/auto';
import ChartTabsComponent from './ChartTabsComponent';
import '../../styles/dashboard.css';

const ChartComponent = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [chartsData, setChartsData] = useState(null);
  const [activeTab, setActiveTab] = useState('1');

  const totalAmountChartRef = useRef(null);
  const checkoutTagsChartRef = useRef(null);
  const checkoutIDsChartRef = useRef(null);

  const reloadChartWithAnimation = (chartRef) => {
    if (chartRef && chartRef.current) {
      const chart = chartRef.current;
      const originalData = chart.data.datasets[0].data.slice();
      chart.data.datasets[0].data = [];
      chart.update();

      setTimeout(() => {
        chart.data.datasets[0].data = originalData;
        chart.update();
      }, 0);
    }
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
    switch (key) {
      case '1':
        reloadChartWithAnimation(totalAmountChartRef);
        break;
      case '2':
        reloadChartWithAnimation(checkoutTagsChartRef);
        break;
      case '3':
        reloadChartWithAnimation(checkoutIDsChartRef);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();

    console.log('hi there');

    if (new Date(endDate) < new Date(startDate)) {
      alert('終止日期不得小於起始日期！');
      setStartDate('');
      setEndDate('');
      return;
    }

    const date = {
      startDate: startDate,
      endDate: endDate,
    };

    console.log(date);

    fetch('http://localhost:3000/api/1.0/admin/fetchDashboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(date),
    })
      .then((res) => res.json())
      .then((resData) => {
        setChartsData(resData);
        console.log(resData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const firstDay = new Date(year, month, 2).toISOString().split('T')[0];
    const lastDay = new Date(year, month + 1, 1).toISOString().split('T')[0];

    setStartDate(firstDay);
    setEndDate(lastDay);
    console.log(`hi, ${startDate}${endDate}`);
    handleSubmit();
  }, []);

  useEffect(() => {
    if (chartsData && chartsData.checkoutAmountByDay) {
      createChart('totalAmountCanvas', chartsData.checkoutAmountByDay);
    }
  }, [chartsData]);

  useEffect(() => {
    if (chartsData && chartsData.checkoutTags) {
      createCheckoutTagsChart(chartsData.checkoutTags);
    }
  }, [chartsData]);

  useEffect(() => {
    if (chartsData && chartsData.checkoutIDs) {
      createCheckoutIDsChart(chartsData.checkoutIDs);
    }
  }, [chartsData]);

  const createCheckoutIDsChart = (checkoutIDs) => {
    const canvas = document.getElementById('checkoutIDsCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    if (checkoutIDsChartRef.current) {
      checkoutIDsChartRef.current.destroy();
    }

    checkoutIDsChartRef.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: checkoutIDs.map((i) => i._id),
        datasets: [
          {
            label: '用戶排行',
            data: checkoutIDs.map((i) => i.count),
            backgroundColor: [
              'rgba(210, 105, 30, 0.6)',
              'rgba(160, 82, 45, 0.6)',
              'rgba(139, 69, 19, 0.6)',
            ],
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          title: {
            display: true,
            text: '用戶排行榜',
            font: {
              size: 40,
            },
          },
          legend: {
            display: true,
          },
        },
        elements: {
          arc: {
            borderWidth: 0,
            borderColor: '#000',

            backgroundColor: (context) => {
              const ctx = context.chart.ctx;
              const index = context.dataIndex;
              const value = context.dataset.data[index];
              const gradient = ctx.createLinearGradient(0, 0, 0, 400);
              gradient.addColorStop(0, 'rgba(210, 105, 30, 0.6)'); // 巧克力色
              gradient.addColorStop(1, 'rgba(0, 0, 0, 0.8)'); // 深色

              ctx.shadowOffsetX = 3;
              ctx.shadowOffsetY = 3;
              ctx.shadowBlur = 10;
              ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
              return gradient;
            },
          },
        },
        animation: {
          animateRotate: true,
          animateScale: true,
          duration: 3000,
        },
      },
    });
  };

  const createCheckoutTagsChart = (checkoutTags) => {
    const canvas = document.getElementById('checkoutTagsCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    if (checkoutTagsChartRef.current) {
      checkoutTagsChartRef.current.destroy();
    }

    // 创建新的图表实例
    checkoutTagsChartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: checkoutTags.map((tag) => tag._id),
        datasets: [
          {
            label: 'Checkout Tags',
            data: checkoutTags.map((tag) => tag.count),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        animation: {
          easing: 'easeInOutElastic',
          duration: 1000,
          // tension: {
          //   duration: 500,
          //   easing: 'linear',
          //   from: 1,
          //   to: 0,
          //   loop: true,
          // },
        },
        plugins: {
          title: {
            display: true,
            text: '熱門標籤',
            font: {
              size: 40,
            },
          },
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
            },
          },
        },
      },
    });
  };

  const createChart = (canvasId, data) => {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    if (totalAmountChartRef.current) {
      totalAmountChartRef.current.destroy();
    }

    totalAmountChartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map((item) => item.date),
        datasets: [
          {
            label: '每日營業額',
            data: data.map((item) => item.amount),
            backgroundColor: 'orange',
            borderColor: 'orange',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Amount',
            },
            ticks: {
              maxTicksLimit: 10,
            },
          },
          x: {
            title: {
              display: true,
              text: 'Date',
            },
          },
        },
        animation: {
          duration: 2500,
          easing: 'easeOutBounce',
        },
        plugins: {
          title: {
            display: true,
            text: '當日營業額',
            font: {
              size: 40,
            },
          },
          datalabels: {
            color: '#444',
            align: 'end',
            anchor: 'end',
            formatter: function (value, context) {
              return value;
            },
          },
          legend: {
            display: false,
          },
        },
        responsive: true,
        maintainAspectRatio: true,
      },
    });
  };

  return (
    <div>
      <form id="dashboard-form" onSubmit={handleSubmit}>
        <label htmlFor="start-date">起始日期：</label>
        <input
          type="date"
          id="start-date"
          name="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />

        <label htmlFor="end-date">終止日期：</label>
        <input
          type="date"
          id="end-date"
          name="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />

        <button id="dashboard-form-button" type="submit">
          提交
        </button>
      </form>

      <ChartTabsComponent onChange={handleTabChange} />

      <div id="chartCarousel" className="carousel">
        <canvas
          id="totalAmountCanvas"
          style={{ display: activeTab === '1' ? 'block' : 'none' }}
        ></canvas>
        <canvas
          id="checkoutTagsCanvas"
          style={{ display: activeTab === '2' ? 'block' : 'none' }}
        ></canvas>
        <canvas
          id="checkoutIDsCanvas"
          style={{ display: activeTab === '3' ? 'block' : 'none' }}
        ></canvas>
      </div>
    </div>
  );
};

export default ChartComponent;
