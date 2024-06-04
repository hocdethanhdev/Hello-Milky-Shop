import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const keyword = document.getElementById('search_suggest-compo-tri').value;
    navigate(`/all-products/${keyword}`);
  };

  return (
    <header className="header-compo-tri">
      <div className="container-compo-tri">
        <div className="logo-compo-tri">
          <Link to="/">
            <img src="/ImageMilkShop/Logo.jpg" alt="LogoMilky" />
          </Link>
        </div>

        <div className="box_search-compo-tri">
          <form onSubmit={handleSearch} id="fromSearch">
            <input
              type="text"
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
