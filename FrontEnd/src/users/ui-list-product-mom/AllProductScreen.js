import React from 'react';




import './ListProductMomScreen.css';



import NavCate from '../ui-product-mom/NavCate';


import AllProduct from './AllProduct';

function AllProductScreen() {
    return (
        <div >



            <NavCate />

            <div className='main-product-listmom-thinh-screen'>
                <AllProduct />
            </div>

        </div>
    );
}

export default AllProductScreen;
