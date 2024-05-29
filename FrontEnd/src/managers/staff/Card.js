import React from 'react';


function Card() {
    const cardData = [
        { title: 'Tổng đơn hàng', value: 1500 },
        { title: 'Đơn hàng mới', value: 50 },
        { title: 'Đơn hàng đang xử lý', value: 120 },
        { title: 'Đơn hàng đã hoàn thành', value: 1300 },
        { title: 'Tổng doanh thu', value: '1,500,000,000 đ' },
        { title: 'Khách hàng mới', value: 200 },
    ];
    const Card = ({ title, value }) => (
        <div className="card">
            <h2>{title}</h2>
            <p>{value}</p>
        </div>
    );
    return (
        <div className="dashboard ">
            <h1>Dashboard</h1>
            <div className="stats">

                {cardData.map((data, index) => (
                    <Card key={index} title={data.title} value={data.value} />
                ))}
            </div>


        </div>
    );
}
export default Card;