import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import "./Header.css";
import { logout } from "../store/actions/authAction";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const [showMenu, setShowMenu] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    const keyword = document.getElementById("search_suggest-compo-tri").value;
    navigate(`/all-products/${keyword}`);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showMenu && !event.target.closest(".account-menu")) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const confirmLogout = () => {
    setShowConfirmation(true);
  };

  const cancelLogout = () => {
    setShowConfirmation(false);
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
          {isLoggedIn ? (
            <div className="account-menu-Nhan">
              <span>
                <i className="fas fa-user"></i> Tài khoản
              </span>
            </div>
          ) : (
            <div className="box_user-compo-tri">
              <i className="fa fa-user"></i>
              <Link to="/login">Đăng nhập</Link>
              <span> | </span>
              <Link to="/signup">Đăng ký</Link>
            </div>
          )}

          <div className="box_cart-compo-tri">
            <Link to="/ShoppingCart">
              <i className="fa fa-shopping-cart"></i>
              <p>Giỏ hàng</p>
            </Link>
          </div>
          {isLoggedIn && (
            <Link to="/">
              <div>
                <div className="dangxuatNhan" >
                <span onClick={confirmLogout}>
                  <i className="fas fa-sign-out-alt"></i> Đăng xuất
                </span>
                </div>
                
                {showConfirmation && (
                  <div className="confirmation-dialog">
                    <p>Bạn có chắc chắn muốn đăng xuất không?</p>
                    <button className="DongY" onClick={() => dispatch(logout())}>Đồng ý</button>
                    <button className="Huy" onClick={cancelLogout}>Hủy bỏ</button>
                  </div>
                )}
              </div>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
