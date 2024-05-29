import React from 'react';
import './MainDash.css';
import Chart from 'react-apexcharts';
import { barChartOptions, areaChartOptions } from './chartOptions';

function MainDash() {
    return (
        <div className="grid-container-dasha">
            <main className="main-container-dasha">

                <div className="main-cards-dasha">
                    <div className="card-dasha1" >
                        <div className="card-inner-dasha">
                            <h3>PRODUCTS</h3>
                            <span className="material-icons-outlined fas fa-box"></span>
                        </div>
                        <h1>249</h1>
                    </div>
                    <div className="card-dasha2" >
                        <div className="card-inner-dasha">
                            <h3>CATEGORIES</h3>
                            <span className="material-icons-outlined">category</span>
                        </div>
                        <h1>25</h1>
                    </div>
                    <div className="card-dasha3" >
                        <div className="card-inner-dasha">
                            <h3>CUSTOMERS</h3>
                            <span className="material-icons-outlined">groups</span>
                        </div>
                        <h1>1500</h1>
                    </div>
                    <div className="card-dasha4" >
                        <div className="card-inner-dasha">
                            <h3>ALERTS</h3>
                            <span className="material-icons-outlined">notification_important</span>
                        </div>
                        <h1>56</h1>
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
