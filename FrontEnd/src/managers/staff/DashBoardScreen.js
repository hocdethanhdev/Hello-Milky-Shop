import React from 'react';

import Sidebar from './Slidebar';
import Dashboard from './Dashboard';

function DashBoardScreen() {
    return (
        <div >

            <div className='some row'>
                <div className='some-thang col-md-2'>
                    <Sidebar />
                </div>
                <div className='col-md-10'>
                    <Dashboard />
                </div>

            </div>

        </div>
    );
}

export default DashBoardScreen;