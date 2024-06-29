import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Header.css";
import { logout } from "../store/actions/authAction";
import { apiGetOne } from "../users/apis/userService";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, token, role } = useSelector((state) => state.auth); // Thêm role vào useSelector
  const [showMenu, setShowMenu] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userData, setUserData] = useState({});

  const handleSearch = (e) => {
    e.preventDefault();
    let keyword = document.getElementById("search_suggest-compo-tri").value.trim();

    const replacements = {
      "\\bbe\\b": "bé",
      "\\bme\\b": "mẹ",
      "\\bsua\\b": "sữa",
    };

    for (let [key, value] of Object.entries(replacements)) {
      const regex = new RegExp(key, "gi");
      keyword = keyword.replace(regex, value);
    }

    keyword = keyword.replace(/\s+/g, " ");
    navigate(`/all-products/${keyword}`);
  };

  useEffect(() => {
    const fetchUser = async () => {
      let response = await apiGetOne(token);
      if (response?.data.err === 0) setUserData(response.data?.data);
    };
    token && fetchUser();
  }, [token]);

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

  const handleLogout = () => {
    dispatch(logout());
    setShowConfirmation(false); // Đóng hộp thoại xác nhận
    navigate("/login"); // Điều hướng đến trang đăng nhập
  };

  return (
    <header className="header-compo-tri">
      <div className="container-compo-tri">
        <div className="logo-compo-tri">
          {role === 0 || role === 3 ? (
            <Link to="/">
              <img src="https://firebasestorage.googleapis.com/v0/b/hellomilkyshop-4cf00.appspot.com/o/images%2FScreenshot%202024-06-29%20121611.png?alt=media&token=8a1195ff-50c1-4e1d-ba67-df3442183f9f" alt="LogoMilky" />
            </Link>
          ) : (
            <img src="https://firebasestorage.googleapis.com/v0/b/hellomilkyshop-4cf00.appspot.com/o/images%2FScreenshot%202024-06-29%20121611.png?alt=media&token=8a1195ff-50c1-4e1d-ba67-df3442183f9f" alt="LogoMilky" />
          )}
        </div>
        {(role === 0 || role === 3) && (
          <div className="box_search-compo-tri">
            <form onSubmit={handleSearch} id="fromSearch">
              <input
                className="tim-kiem"
                type="text"
                name="keyword"
                placeholder="Bố mẹ tìm gì cho bé hôm nay?"
                id="search_suggest-compo-tri"
              />
              <button className="search-button-header" type="submit" id="btnSearch">
                <i className="fa fa-search"></i>
              </button>
            </form>
          </div>
        )}
        <div className="box_right_header-compo-tri">
          {isLoggedIn ? (
            <div className="account-menu-Nhan">
              <Link to="/profile">
                <span>
                  <i className="fas fa-user"></i> {userData?.UserName}
                </span>
              </Link>
            </div>
          ) : (
            <div className="box_user-compo-tri">
              <i className="fa fa-user"></i>
              <Link to="/login">Đăng nhập</Link>
              <span> | </span>
              <Link to="/signup">Đăng ký</Link>
            </div>
          )}
          {role === 3 && (
            <div className="box_cart-compo-tri">
              <Link to="/ShoppingCart">
                <i className="fa fa-shopping-cart"></i>
                <p>Giỏ hàng</p>
              </Link>
            </div>
          )}
          {isLoggedIn && (
            <div>
              <div className="dangxuatNhan">
                <span className="logout-link" onClick={confirmLogout}>
                  <i className="fas fa-sign-out-alt"></i> Đăng xuất
                </span>
              </div>
              {showConfirmation && (
                <div className="confirmation-dialog">
                  <p>Bạn có chắc chắn muốn đăng xuất không?</p>
                  <button
                    className="DongY btn btn-success"
                    onClick={handleLogout}
                  >
                    Đồng ý
                  </button>
                  <button className="Huy btn btn-danger" onClick={cancelLogout}>
                    Hủy bỏ
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
