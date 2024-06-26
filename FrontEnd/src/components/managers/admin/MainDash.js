import React, { useEffect, useState } from "react";
import "./MainDash.css";
import Chart from "react-apexcharts";
import { HiUsers } from "react-icons/hi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillTrendUp } from '@fortawesome/free-solid-svg-icons';

function MainDash() {
  const [productCount, setProductCount] = useState(0);
  const [brandCount, setBrandCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [top5BestSell, setTop5BestSell] = useState({
    ProductID: [],
    SumSell: [],
    ProductName: [],
  });
  const [revenueData, setRevenueData] = useState({ months: [], revenue: [] });

  const formattedRevenue = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(revenue);

  useEffect(() => {
    async function fetchData() {
      try {
        const productRes = await fetch(
          "http://localhost:5000/api/v1/product/countProduct"
        );
        const productData = await productRes.json();
        setProductCount(productData.count);

        const brandRes = await fetch(
          "http://localhost:5000/api/v1/product/countBrand"
        );
        const brandData = await brandRes.json();
        setBrandCount(brandData.count);

        const userRes = await fetch(
          "http://localhost:5000/api/v1/user/countUserByRole/3"
        );
        const userData = await userRes.json();
        setUserCount(userData.count);

        const revenueRess = await fetch(
          "http://localhost:5000/api/v1/order/getTodayRevenue"
        );
        const revenueDatas = await revenueRess.json();
        setRevenue(revenueDatas);


        const top5BestSellRes = await fetch(
          "http://localhost:5000/api/v1/product/getTop5ProductBestSeller"
        );
        const top5BestSellData = await top5BestSellRes.json();
        const ProductID = top5BestSellData.data.map((item) => item.ProductID);
        const ProductName = top5BestSellData.data.map(
          (item) => item.ProductName
        );
        const SumSell = top5BestSellData.data.map((item) => item.SumSell);
        setTop5BestSell({ ProductID, SumSell, ProductName });

        const revenueRes = await fetch(
          "http://localhost:5000/api/v1/order/getRevenueLastSevenMonths"
        );
        const revenueData = await revenueRes.json();
        const months = revenueData.map((item) => item.Month);
        const revenue = revenueData.map((item) => (parseInt(item.revenue)));
        console.log(revenue);
        setRevenueData({ months, revenue });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const formatPrice = (price) => {
    return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

  const barChartOptions = {
    series: [
      {
        data: top5BestSell.SumSell,
        name: "Sản phẩm đã bán",
      },
    ],
    options: {
      chart: {
        type: "bar",
        background: "transparent",
        height: 350,
        toolbar: {
          show: false,
        },
      },
      colors: ["#2962ff", "#d50000", "#2e7d32", "#ff6d00", "#583cb3"],
      plotOptions: {
        bar: {
          distributed: true,
          borderRadius: 4,
          horizontal: false,
          columnWidth: "40%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        opacity: 1,
      },
      grid: {
        borderColor: "#55596e",
        yaxis: {
          lines: {
            show: true,
          },
        },
        xaxis: {
          lines: {
            show: true,
          },
        },
      },
      legend: {
        show: false,
      },
      stroke: {
        colors: ["transparent"],
        show: true,
        width: 2,
      },
      tooltip: {
        shared: true,
        intersect: false,
        theme: "dark",
        custom: ({ series, seriesIndex, dataPointIndex, w }) => {
          return `
                        <div class="apexcharts-tooltip-title" style="font-size: 14px; font-weight: bold;">
                            ${top5BestSell.ProductName[dataPointIndex]}
                        </div>
                        <div class="apexcharts-tooltip-y-group">
                            <span class="apexcharts-tooltip-text-label">Số lượng bán: </span>
                            <span class="apexcharts-tooltip-text-value" style="margin-left: 6px;">
                                ${series[seriesIndex][dataPointIndex]}
                            </span>
                        </div>`;
        },
      },
      xaxis: {
        categories: top5BestSell.ProductID,
        title: {
          style: {
            color: "#f5f7ff",
          },
        },
        axisBorder: {
          show: true,
          color: "#55596e",
        },
        axisTicks: {
          show: true,
          color: "#55596e",
        },
        labels: {
          style: {
            colors: "black",
          },
        },
      },
      yaxis: {
        title: {
          text: "Count",
          style: {
            color: "black",
          },
        },
        axisBorder: {
          color: "#55596e",
          show: true,
        },
        axisTicks: {
          color: "#55596e",
          show: true,
        },
        labels: {
          style: {
            colors: "black",
          },
        },
      },
    },
  };

  const areaChartOptions = {
    series: [
      {
        name: "Doanh thu",
        data: revenueData.revenue,
      },
    ],
    options: {
      chart: {
        type: "area",
        background: "transparent",
        height: 350,
        stacked: false,
        toolbar: {
          show: false,
        },
      },
      colors: ["#00ab57"],
      labels: revenueData.months,
      dataLabels: {
        enabled: false,
      },
      fill: {
        gradient: {
          opacityFrom: 0.4,
          opacityTo: 0.1,
          shadeIntensity: 1,
          stops: [0, 100],
          type: "vertical",
        },
        type: "gradient",
      },
      grid: {
        borderColor: "#55596e",
        yaxis: {
          lines: {
            show: true,
          },
        },
        xaxis: {
          lines: {
            show: true,
          },
        },
      },
      legend: {
        show: false,
      },
      markers: {
        size: 6,
        strokeColors: "#1b2635",
        strokeWidth: 3,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        axisBorder: {
          color: "#55596e",
          show: true,
        },
        axisTicks: {
          color: "#55596e",
          show: true,
        },
        labels: {
          offsetY: 5,
          style: {
            colors: "black",
          },
        },
      },
      yaxis: {
        title: {
          text: "Revenue",
          style: {
            color: "black",
          },
        },
        labels: {
          formatter: function (value) {
            return formatPrice(value);
          },
          style: {
            colors: ["black"],
          },
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
        theme: "dark",
        style: {
          fontSize: "14px",
          maxWidth: "300px",
          marginLeft: "6px",
        },
        custom: ({ series, seriesIndex, dataPointIndex, w }) => {
          return `
                    <div class="apexcharts-tooltip-title" style="font-size: 14px; font-weight: bold;">
                        ${revenueData.months[dataPointIndex]}
                    </div>
                    <div class="apexcharts-tooltip-y-group">
                        <span class="apexcharts-tooltip-text-label">Doanh thu: </span>
                        <span class="apexcharts-tooltip-text-value">
                            ${formatPrice(series[seriesIndex][dataPointIndex])}
                        </span>
                    </div>`;
        },
      },
    },
  };


  return (
    <div className="grid-container-dasha">
      <main className="main-container-dasha">
        <div className="main-cards-dasha">
          <div className="card-dasha1">
            <div className="card-inner-dasha">
              <h3>Products</h3>
              <span className="material-icons-outlined fas fa-box"></span>
            </div>
            <h1>{productCount}</h1>
          </div>
          <div className="card-dasha2">
            <div className="card-inner-dasha">
              <h3>Brands</h3>
              <span className="material-icons-outlined fab fa-bandcamp"></span>
            </div>
            <h1>{brandCount}</h1>
          </div>
          <div className="card-dasha3">
            <div className="card-inner-dasha">
              <h3>Users</h3>
              <span className="material-icons-outlined">
                <HiUsers />
              </span>
            </div>
            <h1>{userCount}</h1>
          </div>
          <div className="card-dasha4">
            <div className="card-inner-dasha">
              <h3>Doanh thu</h3>
              <span className="material-icons-outlined">
                <FontAwesomeIcon icon={faMoneyBillTrendUp} />
              </span>
            </div>
            <h1>{formattedRevenue}</h1>
          </div>
        </div>
        <div className="charts-dasha">
          <div className="charts-card-dasha">
            <h2 className="chart-title-dasha">Top 5 Sản phẩm bán chạy</h2>
            <Chart
              options={barChartOptions.options}
              series={barChartOptions.series}
              type="bar"
              height={350}
            />
          </div>
          <div className="charts-card-dasha">
            <h2 className="chart-title-dasha">Doanh thu trong 7 tháng</h2>
            <Chart
              options={areaChartOptions.options}
              series={areaChartOptions.series}
              type="area"
              height={350}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainDash;
