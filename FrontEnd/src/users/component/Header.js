import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <div>
      <header className="header">
        <div className="container">
          <div className="logo">
            <Link to="/">
              <img src="/ImageMilkShop/Logo.jpg" alt="LogoMilky" />
            </Link>
          </div>
          <div className="box_search left">
            <form action="/Desktop/SearchDesktop/SearchTemp" id="fromSearch" method="post">
              <input 
                type="text" 
                data-url="/Product/SuggestProduct" 
                name="keyword" 
                placeholder="Bố mẹ tìm gì cho bé hôm nay ?" 
                id="search_suggest"
              />
              <button className="" type="submit" id="btnSearch">
                <i className="fa fa-search"></i>
              </button>
            </form>                        
          </div>
          
          <div className="box_right_header">
            <div className="box_user">
              <div>
                <i className="fa fa-user"></i>
                <Link to="/login">Đăng nhập</Link><span> | </span><Link to="/signup">Đăng kí</Link>
              </div>
            </div>
            <div className="box_cart">
              <Link to="/pay">
                <i className="fa fa-shopping-cart"></i>
                <p>Giỏ hàng</p>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
