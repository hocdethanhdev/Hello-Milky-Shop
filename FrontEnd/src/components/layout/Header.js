import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Header.css";
import { logout } from "../store/actions/authAction";
import LanguageSelector from "../users/language/LanguageSelector.tsx";
import { useTranslation } from "react-i18next";
import { AES, enc } from "crypto-js";
import config from "../config/config.js";
import axios from "axios";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, token, role } = useSelector((state) => state.auth); // Thêm role vào useSelector
  const decryptedToken = token
    ? AES.decrypt(token, config.SECRET_KEY).toString(enc.Utf8)
    : null;
  const decryptedRole = role
    ? parseInt(AES.decrypt(role, config.SECRET_KEY).toString(enc.Utf8))
    : 0;
  const [showMenu, setShowMenu] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [userData, setUserData] = useState({});
  const { t } = useTranslation();

  const handleSearch = (e) => {
    e.preventDefault();
    let keyword = document
      .getElementById("search_suggest-compo-tri")
      .value.trim();

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
      try {
        const response = await axios.post(`${config.API_ROOT}/api/v1/user/getOne`, {
          "token": decryptedToken,
        });
        console.log(response);
        if (response?.data.err === 0) setUserData(response.data?.data);
      } catch (error) {
        dispatch(logout());
      }
    };
    decryptedToken && fetchUser();
  }, [decryptedToken, dispatch, navigate]);

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
          {decryptedRole === 0 || decryptedRole === 3 ? (
            <Link to="/">
              <img
                src="https://firebasestorage.googleapis.com/v0/b/hellomilkyshop-4cf00.appspot.com/o/images%2Fz5605685075502_1381f9f86d72f76aca5de96e6cfbe0e8.jpg?alt=media&token=6fce3a72-15da-4345-be72-5497f315abea"
                alt="LogoMilky"
              />
            </Link>
          ) : (
            <img
              src="https://firebasestorage.googleapis.com/v0/b/hellomilkyshop-4cf00.appspot.com/o/images%2Fz5605685075502_1381f9f86d72f76aca5de96e6cfbe0e8.jpg?alt=media&token=6fce3a72-15da-4345-be72-5497f315abea"
              alt="LogoMilky"
            />
          )}
        </div>
        {(decryptedRole === 0 || decryptedRole === 3) && (
          <div className="box_search-compo-tri">
            <form onSubmit={handleSearch} id="fromSearch">
              <input
                className="tim-kiem"
                type="text"
                name="keyword"
                placeholder={t("whatAreParentsLookingForTheirChildrenToday?")}
                id="search_suggest-compo-tri"
              />
              <button
                className="search-button-header"
                type="submit"
                id="btnSearch"
              >
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
              <Link to="/login">{t("logIn")}</Link>
              <span> | </span>
              <Link to="/signup">{t("signUp")}</Link>
            </div>
          )}
          {decryptedRole === 3 && (
            <div className="box_cart-compo-tri">
              <Link to="/ShoppingCart">
                <i className="fa fa-shopping-cart"></i>
                <p>{t("cart")}</p>
              </Link>
            </div>
          )}
          {isLoggedIn && (
            <div>
              <div className="dangxuatNhan">
                <span className="logout-link" onClick={confirmLogout}>
                  <i className="fas fa-sign-out-alt"></i> {t("logOut")}
                </span>
              </div>
              {showConfirmation && (
                <div className="confirmation-dialog">
                  <p>{t("areYouSureWantToSignOut?")}</p>
                  <button
                    className="DongY btn btn-success"
                    onClick={handleLogout}
                  >
                    {t("yes")}
                  </button>
                  <button className="Huy btn btn-danger" onClick={cancelLogout}>
                    {t("cancle")}
                  </button>
                </div>
              )}
            </div>
          )}
          {(decryptedRole === 0 || decryptedRole === 3) && (
            <div className="i8-home-page">
              <LanguageSelector />{" "}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
