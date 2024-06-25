import React, { useEffect, useState } from 'react';
import './MainDash.css';
import Chart from 'react-apexcharts';
import { barChartOptions, areaChartOptions } from './chartOptions';
import { HiUsers } from "react-icons/hi";
function MainDash() {
    const [productCount, setProductCount] = useState(0);
    const [brandCount, setBrandCount] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const [notificationCount, setNotificationCount] = useState(56); // Static as per your code

    useEffect(() => {
        async function fetchData() {
            try {
                const productRes = await fetch('http://localhost:5000/api/v1/product/countProduct');
                const productData = await productRes.json();
                setProductCount(productData.count);

                const brandRes = await fetch('http://localhost:5000/api/v1/product/countBrand');
                const brandData = await brandRes.json();
                setBrandCount(brandData.count);

                const userRes = await fetch('http://localhost:5000/api/v1/user/countUserByRole/3');
                const userData = await userRes.json();
                setUserCount(userData.count);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchData();
    }, []);

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
                            <span className="material-icons-outlined"><HiUsers /></span>
                        </div>
                        <h1>{userCount}</h1>
                    </div>
                    <div className="card-dasha4">
                        <div className="card-inner-dasha">
                            <h3>4</h3>
                            <span className="material-icons-outlined">notification_important</span>
                        </div>
                        <h1>{notificationCount}</h1>
                    </div>
                </div>
                <div className="charts-dasha">
                    <div className="charts-card-dasha">
                        <h2 className="chart-title-dasha">Top 5 Products</h2>
                        <Chart options={barChartOptions.options} series={barChartOptions.series} type="bar" height={350} />
                    </div>
                    <div className="charts-card-dasha">
                        <h2 className="chart-title-dasha">Revenue</h2>
                        <Chart options={areaChartOptions.options} series={areaChartOptions.series} type="area" height={350} />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default MainDash;