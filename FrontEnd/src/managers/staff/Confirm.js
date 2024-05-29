import React from 'react';
import './Confirm.css';

function Confirm() {
    return (
        <div className="confirm-container">
            <div className="orders-header">
                <h2>DANH SÁCH ĐƠN HÀNG</h2>
                <div className="search-orders">
                    <input type="text" placeholder="Tìm kiếm..." />
                    <button type="button">
                        <img src="/ImageMilkShop/searchicon.png" alt="Search" style={{ width: '20px' }} />
                    </button>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Mã</th>
                        <th>Ngày tạo</th>
                        <th>Khách hàng</th>
                        <th>Trạng thái</th>
                        <th style={{ textAlign: 'center' }}>Phương thức thanh toán</th>
                        <th>Tổng tiền</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>#M103578</td>
                        <td>10/05/2024 12:25</td>
                        <td>Trần Hữu Trí</td>
                        <td className="paid">Hoàn thành</td>
                        <td style={{ textAlign: 'center' }}>ATM</td>
                        <td>1,152,000 đ</td>
                        <td>
                            <button type="button" className='btn btn-primary'>Detail</button>
                        </td>
                    </tr>
                    <tr>
                        <td>#M121849</td>
                        <td>26/11/2023 14:05</td>
                        <td>Lê Phước Thịnh</td>
                        <td className="paid">Hoàn thành</td>
                        <td style={{ textAlign: 'center' }}>COD</td>
                        <td>1,450,000 đ</td>
                        <td>
                            <button type="button " className='btn btn-primary'>Detail</button>
                        </td>
                    </tr>
                    <tr>
                        <td>#M224701</td>
                        <td>23/10/2024 12:25</td>
                        <td>Võ Thanh Nhàn</td>
                        <td className="paid">Hoàn thành</td>
                        <td style={{ textAlign: 'center' }}>ATM</td>
                        <td>299,000 đ</td>
                        <td>
                            <button type="button" className='btn btn-primary'>Detail</button>
                        </td>
                    </tr>
                    <tr>
                        <td>#M224741</td>
                        <td>23/10/2024 12:25</td>
                        <td>Nguyễn Khải Qui</td>
                        <td className="processing">Đang giao</td>
                        <td style={{ textAlign: 'center' }}>COD</td>
                        <td>800,000 đ</td>
                        <td>
                            <button type="button" className='btn btn-primary'>Detail</button>
                        </td>
                    </tr>
                    <tr>
                        <td>#M224701</td>
                        <td>23/10/2024 12:25</td>
                        <td>Nguyễn Hoàng Long</td>
                        <td className="processing">Đang giao</td>
                        <td style={{ textAlign: 'center' }}>ATM</td>
                        <td>5,000,000 đ</td>
                        <td>
                            <button type="button" className='btn btn-primary'>Detail</button>
                        </td>
                    </tr>
                    <tr>
                        <td>#M225678</td>
                        <td>12/12/2023 09:30</td>
                        <td>Đặng Thị Lan</td>
                        <td className="paid">Hoàn thành</td>
                        <td style={{ textAlign: 'center' }}>ATM</td>
                        <td>2,300,000 đ</td>
                        <td>
                            <button type="button" className='btn btn-primary'>Detail</button>
                        </td>
                    </tr>
                    <tr>
                        <td>#M225679</td>
                        <td>14/11/2023 10:15</td>
                        <td>Trương Văn Minh</td>
                        <td className="processing">Đang giao</td>
                        <td style={{ textAlign: 'center' }}>COD</td>
                        <td>750,000 đ</td>
                        <td>
                            <button type="button" className='btn btn-primary'>Detail</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className="pagination">
                <button className="page-dot active"></button>
                <button className="page-dot"></button>
                <button className="page-dot"></button>
                <button className="page-dot"></button>
            </div>

        </div>
    );
};

export default Confirm;
