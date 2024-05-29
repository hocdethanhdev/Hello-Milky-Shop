import React from 'react';
import './Report.css';

function Report() {
    return (

        <div className="report-container">

            <div className="report-body">

                <div className="main-content">
                    <div className="report-section">
                        <h1>Xử lý report</h1>
                        <table>
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>ID</th>
                                    <th>Tên người báo cáo</th>
                                    <th>Nội dung báo cáo</th>
                                    <th>Thời gian</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th><input type="checkbox" /></th>
                                    <td>1</td>
                                    <td>Nguyễn Văn A</td>
                                    <td>Lỗi thanh toán</td>
                                    <td>2024-05-20 10:30</td>
                                </tr>
                            </tbody>
                        </table>
                        <button className="save-all btn btn-success">Save all</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Report;
