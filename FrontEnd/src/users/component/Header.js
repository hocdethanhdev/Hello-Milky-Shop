import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header-compo-tri">
      <div className="container-compo-tri">
        <div className="logo-compo-tri">
          <Link to="/">
            <img src="/ImageMilkShop/Logo.jpg" alt="LogoMilky" />
          </Link>
        </div>

        <div className="box_search-compo-tri">
          <form action="/Desktop/SearchDesktop/SearchTemp" id="fromSearch" method="post">
            <input
              type="text"
              data-url="/Product/SuggestProduct"
              name="keyword"
              placeholder="Bố mẹ tìm gì cho bé hôm nay?"
              id="search_suggest-compo-tri"
            />
            <button className="search-button" type="submit" id="btnSearch">
              <i className="fa fa-search"></i>
            </button>
          </form>
        </div>

        <div className="box_right_header-compo-tri">
          <div className="box_user-compo-tri">
            <i className="fa fa-user"></i>
            <Link to="/login">Đăng nhập</Link>
            <span> | </span>
            <Link to="/signup">Đăng ký</Link>
          </div>
          <div className="box_cart-compo-tri">
            <Link to="/ShoppingCart">
              <i className="fa fa-shopping-cart"></i>
              <p>Giỏ hàng</p>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
