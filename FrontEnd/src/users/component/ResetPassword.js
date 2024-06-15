import React, { useState } from "react";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../../config/firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import './ResetPassword.css';
import PasswordResetForm from './PasswordResetForm';

const ResetPassword = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const [showResetForm, setShowResetForm] = useState(false);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {
            toast.error("Recaptcha expired. Please try again.");
          },
        },
        auth
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();
  
    const appVerifier = window.recaptchaVerifier;
  
    const formatPh = "+" + ph;
  
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        // Do not set setShowOTP(true) here, wait for user action
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
        setLoading(false);
        toast.error("Failed to send OTP. Please try again.");
      });
  }
  

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log("OTP confirmed:", res);
        setUser(res.user);
        setLoading(false);
        setShowResetForm(true); // Hiển thị form đặt lại mật khẩu
        toast.success("OTP verified successfully!");
      })
      .catch((err) => {
        console.error("Error verifying OTP:", err);
        setLoading(false);
        toast.error("Failed to verify OTP. Please try again.");
      });
  }
  
  function checkPhoneNumberExists() {
    const phApi = "0" + ph.substring(2); // Chuyển đổi số điện thoại từ "+84..." sang "0..."
    console.log(phApi)
    fetch("http://localhost:5000/api/v1/auth/checkPhoneNumber", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        PhoneNumber: phApi,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Phone number does not exist.");
        }
        return response.json();
      })
      .then((data) => {
        // Set state to show OTP input
        setShowOTP(true);
        toast.success("Phone number exists. OTP will be sent.");
        // Do not call onSignup here, wait for user action
      })
      .catch((error) => {
        console.error("Error checking phone number:", error);
        toast.error("Phone number does not exist. Please enter a correct number.");
      });
  }
  
  return (
    <section className="reset-password-container">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
          <h2 className="success-message">
            Password reset successful. Proceed to next step.
          </h2>
        ) : (
          <div className="reset-form">
            <h1 className="title text-center">
              Quên mật khẩu
            </h1>
            {showOTP ? (
              <>
                <div className="icon-container">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label
                  htmlFor="otp"
                  className="otp-label"
                >
                  Nhập OTP
                </label>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                  className="otp-input-container"
                ></OtpInput>
                <button
                  onClick={onOTPVerify}
                  className="otp-button"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Xác nhận OTP</span>
                </button>
              </>
            ) : (
              <>
                <div className="icon-container">
                  <BsTelephoneFill size={30} />
                </div>
                <label
                  htmlFor=""
                  className="phone-label "
                >
                  Nhập số điện thoại của bạn
                </label>
                <PhoneInput country={"vn"} value={ph} onChange={setPh} />
                <button
                  onClick={checkPhoneNumberExists}
                  className="send-otp-button"
                >
                  {loading && (
                    <CgSpinner size={20} className="mt-1 animate-spin" />
                  )}
                  <span>Gửi OTP</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default ResetPassword;
