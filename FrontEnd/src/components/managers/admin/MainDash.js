import React, { useEffect, useState } from "react";
import "./MainDash.css";
import Chart from "react-apexcharts";
import { HiUsers } from "react-icons/hi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillTrendUp } from "@fortawesome/free-solid-svg-icons";

function MainDash() {
  const [productCount, setProductCount] = useState(0);
  const [brandCount, setBrandCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [topProducts, setTopProducts] = useState([]);

  const formattedRevenue = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(revenue);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch general data
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

        const revenueRes = await fetch(
          "http://localhost:5000/api/v1/order/getTodayRevenue"
        );
        const revenueData = await revenueRes.json();
        setRevenue(revenueData);

        // Fetch top 5 best-selling products
        const topProductsRes = await fetch(
          "http://localhost:5000/api/v1/product/getTop5ProductBestSeller"
        );
        const topProductsData = await topProductsRes.json();
        setTopProducts(topProductsData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  // Biểu đồ cột cho top 5 sản phẩm bán chạy nhất
  const barChartOptions = {
    options: {
      chart: {
        id: "top-products-chart",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: topProducts.map((product) => product.ProductName),
      },
    },
    series: [
      {
        name: "Số lượng bán",
        data: topProducts.map((product) => product.SumSell),
      },
    ],
  };

  // Biểu đồ diện tích cho doanh thu
  const areaChartOptions = {
    options: {
      chart: {
        id: "revenue-chart",
        toolbar: {
          show: false,
        },
      },
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
    },
    series: [
      {
        name: "Doanh thu",
        data: [30, 40, 35, 50, 49, 60, 70],
      },
    ],
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
            <h2 className="chart-title-dasha">Top 5 Products</h2>
            <Chart
              options={barChartOptions.options}
              series={barChartOptions.series}
              type="bar"
              height={300}
            />
          </div>
          <div className="charts-card-dasha">
            <h2 className="chart-title-dasha">Revenue</h2>
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
