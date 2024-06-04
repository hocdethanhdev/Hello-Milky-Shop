import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './ListProductMomScreen.css';





import NavCate from '../ui-product-mom/NavCate';


import ListProductMom from './ListProductMom';

function ListProductMomScreen() {
    return (
        <div >



            <NavCate />

            <div className='main-product-listmom-thinh-screen'>
                <ListProductMom />
            </div>

        </div>
    );
}

export default ListProductMomScreen;
