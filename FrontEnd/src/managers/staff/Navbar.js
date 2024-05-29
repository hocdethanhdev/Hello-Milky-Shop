import React from "react";
import './Navbar.css';
function Navbar() {
    return (
        <div className='Staff-navbar container-fluid'>
            <header className="header-navbar">
                <div className="logo">
                    <img src="/ImageMilkShop/Logo.jpg" alt="Milk Store Logo" style={{ width: '40px' }} />
                </div>
                <div className="box_search left">
                    <form action="/Desktop/SearchDesktop/SearchTemp" id="fromSearch" method="post">
                        <input
                            type="text"
                            // data-url="/Product/SuggestProduct"
                            name="keyword"
                            placeholder="Tìm kiếm..."
                            id="search_suggest"
                        />
                        <button className="nav-search" type="submit" id="btnSearch">
                            <span className="fa fa-search"></span>
                        </button>

                    </form>
                </div>
                <div className="icons">
                    <button type="button" className="button-bell">
                        <span className='noiti fas fa-bell' ></span>
                    </button>
                    <button type="button" className="button-bell">
                        <span class="fas fa-user-alt"></span>
                    </button>
                </div>
            </header>
        </div>
    );
}

export default Navbar;