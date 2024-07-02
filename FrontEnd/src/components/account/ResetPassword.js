import React, { useState, useEffect } from "react";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import { CgSpinner } from "react-icons/cg";
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../config/firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import "./ResetPassword.css";
import axios from "axios";
import Loading from "../layout/Loading";

const ResetPassword = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const [showResetForm, setShowResetForm] = useState(false);
  const [isSignupAttempted, setIsSignupAttempted] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    onCaptchVerify();
  }, []);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            // Callback when recaptcha is verified
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
    if (isSignupAttempted) return;
    setIsSignupAttempted(true);

    setLoading(true);

    const appVerifier = window.recaptchaVerifier;
    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
        setLoading(false);
        setIsSignupAttempted(false); // Allow retry if there was an error
        if (error.code === "auth/quota-exceeded") {
          toast.error("Quota exceeded. Please try again later.");
        } else {
          toast.error("Failed to send OTP. Please try again.");
        }
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        setUser(res.user);
        setLoading(false);
        setShowResetForm(true);
        toast.success("OTP verified successfully!");
      })
      .catch((err) => {
        console.error("Error verifying OTP:", err);
        setLoading(false);
        toast.error("Failed to verify OTP. Please try again.");
      });
  }

  async function checkPhoneNumberExists() {
    const phApi = "0" + ph.substring(2);
    try {
      const checkPH = await axios.post(
        "http://localhost:5000/api/v1/auth/checkPhoneNumber",
        {
          PhoneNumber: phApi,
        }
      );
      if (checkPH.data.err === 0) onSignup();
      else throw new Error("Phone number does not exist.");
    } catch (error) {
      console.error("Error checking phone number:", error);
      toast.error("Phone number does not exist. Please enter a correct number.");
    }
  }

  const handleSendOTPClick = () => {
    if (loading) return; // Prevent action if already loading
    checkPhoneNumberExists();
  };

  const handlePasswordReset = () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match. Please try again.");
      return;
    }

    setLoading(true);

    fetch("http://localhost:5000/api/v1/auth/forgetPassword", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        UserID: user.uid,
        Password: password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to reset password.");
        }
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        toast.success("Password reset successfully!");
      })
      .catch((error) => {
        console.error("Error resetting password:", error);
        setLoading(false);
        toast.error("Failed to reset password. Please try again.");
      });
  };

  return (
    <section className="reset-password-container">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {showResetForm ? (
          <div className="password-reset-form">
            <h2>Đặt lại mật khẩu</h2>
            <div>
              <label>Mật khẩu mới:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label>Xác nhận mật khẩu:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button onClick={handlePasswordReset} disabled={loading}>
              {loading ? <Loading/> : "Đặt lại mật khẩu"}
            </button>
          </div>
        ) : user ? (
          <div className="password-reset-form">
            <h2>Đặt lại mật khẩu</h2>
            <div>
              <label>Mật khẩu mới:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label>Xác nhận mật khẩu:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button onClick={handlePasswordReset} disabled={loading}>
              {loading ? <Loading/> : "Đặt lại mật khẩu"}
            </button>
          </div>
        ) : (
          <div className="reset-form">
            <h1 className="title text-center">Quên mật khẩu</h1>
            {showOTP ? (
              <>
                <div className="icon-container">
                  <BsFillShieldLockFill size={30} />
                </div>
                <label htmlFor="otp" className="otp-label">
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
                <button onClick={onOTPVerify} className="otp-button">
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
                <label htmlFor="" className="phone-label ">
                  Nhập số điện thoại của bạn
                </label>
                <PhoneInput country={"vn"} value={ph} onChange={setPh} />
                <button
                  onClick={handleSendOTPClick}
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
};

export default ResetPassword;
