import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './ListProductMomScreen.css';





import NavCate from '../ui-product-mom/NavCate';


import ListProductBb from './ListProductBb';

function ListProductBbScreen() {
    return (
        <div >



            <NavCate />

            <div className='main-product-listmom-thinh-screen'>
                <ListProductBb />
            </div>

        </div>
    );
}

export default ListProductBbScreen;
