import React, { useState, useEffect, useCallback } from "react";
import SidebarProfile from "./sidebarprofile";
import "./account.css";
import { useSelector } from "react-redux";
import { getUserIdFromToken } from "../../store/actions/authAction";
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import { message } from "antd";
import Loading from "../../layout/Loading";
import config from "../../config/config";
import { useTranslation } from 'react-i18next';
import { AES, enc } from 'crypto-js';

function Account() {
  const [userData, setUserData] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const decryptedToken = token ? AES.decrypt(token, config.SECRET_KEY).toString(enc.Utf8) : null;
  const userId = getUserIdFromToken(decryptedToken);
  const [popupUserNameUpdate, setPopupUserNameUpdate] = useState(false);
  const [popupPhoneUpdate, setPopupPhoneUpdate] = useState(false);
  const [userNameUpdate, setUserNameUpdate] = useState(null);
  const [phoneUpdate, setPhoneUpdate] = useState(null);
  const { t } = useTranslation();

  const fetchUserData = useCallback(async () => {
    try {
      const response = await axios.get(
        `${config.API_ROOT}/api/v1/user/getUserByID?UserID=${userId}`
      );

      if (response.data && response.data.data) {
        setUserData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [userId]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    setPhoneUpdate(userData?.PhoneNumber);
    setUserNameUpdate(userData?.UserName);
  }, [userData]);

  const formatPrice = (price) => {
    return `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]+$/;
    return phoneRegex.test(phone) && phone.length <= 15;
  };

  const handleUpdateUserName = async () => {
    if (userNameUpdate.length > 50) {
      message.error(`${t('accountNameMustNotExceed50Characters')}`);
      return;
    }
    try {
      const updateUserName = await axios.put(
        `${config.API_ROOT}/api/v1/user/updateUserName`,
        {
          UserID: userId,
          UserName: userNameUpdate,
        }
      );
      fetchUserData();
      if (updateUserName.data.err === 0) {
        message.success(`${t('updateSuccessful')}`);
      } else message.error(`${t('updateFailed')}`);
    } catch (error) {
      console.error("Error updating username:", error);
    }
    setPopupUserNameUpdate(false);
    setUserNameUpdate(null);
  };

  const handleUpdatePhoneNumber = async () => {
    if (!validatePhoneNumber(phoneUpdate)) {
      message.error(`${t('invalidPhoneNumber')}`);
      return;
    }
    try {
      const updatePhoneNumber = await axios.put(
        `${config.API_ROOT}/api/v1/user/updateUserPhoneNumber`,
        {
          UserID: userId,
          PhoneNumber: phoneUpdate,
        }
      );
      fetchUserData();
      if (updatePhoneNumber.data.err === 0) {
        message.success(`${t('updateSuccessful')}`);
      } else message.error(`${t('updateFailed')}`);
    } catch (error) {
      console.error("Error updating phone number:", error);
    }
    setPopupPhoneUpdate(false);
    setPhoneUpdate(null);
  };

  const handleChangeUserName = (e) => {
    setUserNameUpdate(e.target.value);
  };

  const handleChangePhoneNumber = (e) => {
    setPhoneUpdate(e.target.value);
  };

  return (
    <div className="account-container">
      <div className="sidebar-wrapper">
        <SidebarProfile />
      </div>

      <div className="account-content">
        <h2>{t('accountInformation')}</h2>
        {userData ? (
          <div>
            <div className="obj-account">
              <strong>{t('nameAccount')}:</strong>
              {!popupUserNameUpdate ? (
                <>
                  {userData.UserName}
                  <CiEdit
                    className="update-account"
                    onClick={() => {
                      setPopupUserNameUpdate(true);
                      setPopupPhoneUpdate(false);
                      setPhoneUpdate(userData.PhoneNumber);
                    }}
                  />
                </>
              ) : (
                <div>
                  <input
                    type="text"
                    value={userNameUpdate}
                    onChange={handleChangeUserName}
                  />
                  <br />
                  <button
                    onClick={handleUpdateUserName}
                    className="btn btn-warning"
                  >
                   {t('update')}
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      setPopupUserNameUpdate(false);
                      setUserNameUpdate(userData.UserName);
                    }}
                  >
                    {t('cancle')}
                  </button>
                </div>
              )}
            </div>
            {userData.Email && (
              <div className="obj-account">
                <strong>{t('email')}: </strong>
                {userData.Email}
              </div>
            )}
            {userData.PhoneNumber && (
              <div className="obj-account">
                <strong>{t('phoneNumber')}:</strong>{" "}
                {!popupPhoneUpdate ? (
                  <>
                    {userData.PhoneNumber}
                    {userData.PhoneNumber && (
                      <CiEdit
                        className="update-account"
                        onClick={() => {
                          setPopupUserNameUpdate(false);
                          setUserNameUpdate(userData.UserName);
                          setPopupPhoneUpdate(true);
                        }}
                      />
                    )}
                  </>
                ) : (
                  <div>
                    <input
                      type="text"
                      value={phoneUpdate}
                      onChange={handleChangePhoneNumber}
                    />
                    <br />
                    <button
                      onClick={handleUpdatePhoneNumber}
                      className="btn btn-warning"
                    >
                      {t('update')}
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        setPopupPhoneUpdate(false);
                        setPhoneUpdate(userData.PhoneNumber);
                      }}
                    >
                      {t('cancle')}
                    </button>
                  </div>
                )}
              </div>
            )}

            <div className="obj-account">
              <strong>{t('currentCoins')}:</strong>{" "}
              <span>
                {userData.Point} = {formatPrice(userData.Point * 10)} VND
              </span>
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

export default Account;
