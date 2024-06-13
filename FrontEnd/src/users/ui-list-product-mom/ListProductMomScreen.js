import React from 'react';
import { Link } from 'react-router-dom';

import './ListProductMomScreen.css';





import NavCate from '../ui-product-mom/NavCate';


import ListProductMom from './ListProductMom';

function ListProductMomScreen() {
    return (
        <div >


            <div className='url-list'>
                <NavCate />
                <div class="breadcrumb-area-thinh-url">
                    <div class="container-thinh-url">
                        <div class="row">
                            <div class="col-12">
                                <div class="breadcrumb-wrap-thinh-url">
                                    <nav aria-label="breadcrumb-thinh-url">
                                        <ul class="breadcrumb-thinh-url">
                                            <li class="breadcrumb-item-thinh-url"><Link to="/"><i class="fa fa-home"></i></Link></li>

                                            <li class="breadcrumb-item-thinh-url active" aria-current="page">Sữa cho mẹ</li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className='main-product-listmom-thinh-screen'>
                <ListProductMom />
            </div>

        </div>
    );
}

export default ListProductMomScreen;
