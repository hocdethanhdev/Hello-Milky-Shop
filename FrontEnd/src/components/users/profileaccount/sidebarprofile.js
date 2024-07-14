import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./sidebarprofile.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { getUserIdFromToken } from "../../store/actions/authAction";
import axios from "axios";
import config from "../../config/config";
import { useTranslation } from 'react-i18next';
import { AES, enc } from 'crypto-js';

function SidebarProfile() {
  const [dropDown, setDropDown] = useState(false);
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const decryptedToken = token ? AES.decrypt(token, config.SECRET_KEY).toString(enc.Utf8) : null;
  const userId = getUserIdFromToken(decryptedToken);
  const [userData, setUserData] = useState(null);
  const { t } = useTranslation();
 

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await axios.get(
        `${config.API_ROOT}/api/v1/user/getUserByID?UserID=${userId}`
      );
      setUserData(response.data.data);
    };
    fetchUserData();
  }, [userId]);

  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  const toggleDropdown = () => {
    setDropDown(!dropDown);
  };

  return (
    <div className="sidebar-container-st-tri">
      <nav className="sidebar-st-thinh">
        <Link to="#" className="manage-st-thinh" onClick={toggleDropdown} >
          <img
            src="https://cdn-icons-png.flaticon.com/128/8188/8188338.png"
            alt="Manage Orders Icon"
            style={{ width: "24px", marginRight: "2px" }}
            className="icon-staff-slidebar"
          />
          {t('myAccount')}
          <FontAwesomeIcon
            icon={dropDown ? faCaretUp : faCaretDown}
            style={{ marginLeft: "5px" }}
          />
        </Link>
        <div
          className={`dropdown-content-st-thinh ${dropDown ? "active" : ""}`}>
          <NavLink
            className={isActiveLink("/account") ? "active-st-thinh" : ""}
            to="/account">
            <img
              src="https://cdn-icons-png.flaticon.com/128/942/942799.png"
              alt="Confirm Icon"
              style={{ width: "24px" }}
              className="icon-staff-slidebar"
            />{" "}
            {t('profile')}
          </NavLink>
          {userData && userData.PhoneNumber !== null && (
            <NavLink
              className={
                isActiveLink("/ChangePassword") ? "active-st-thinh" : ""
              }
              to="/ChangePassword">
              <img
                src="https://cdn-icons-png.flaticon.com/128/159/159478.png"
                alt="Confirm Icon"
                style={{ width: "24px" }}
                className="icon-staff-slidebar"
              />{" "}
              {t('changePassword')}
            </NavLink>
          )}

          <NavLink
            className={isActiveLink("/Address") ? "active-st-thinh" : ""}
            to="/Address">
            <img
              src="https://cdn-icons-png.flaticon.com/128/3607/3607275.png"
              alt="Confirm Icon"
              style={{ width: "24px" }}
              className="icon-staff-slidebar"
            />{" "}
            {t('address2')}
          </NavLink>
        </div>
        <NavLink
          className={isActiveLink("/profile") ? "active-st-thinh" : ""}
          to="/profile">
          <img
            src="https://cdn-icons-png.flaticon.com/128/2728/2728577.png"
            alt="Order Icon"
            style={{ width: "24px" }}
            className="icon-staff-slidebar"
          />{" "}
          {t('yourOrder')}
        </NavLink>
      </nav>
    </div>
  );
}

export default SidebarProfile;
