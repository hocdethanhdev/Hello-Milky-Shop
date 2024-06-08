import React, { useState } from "react";
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import OtpInput from "otp-input-react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { CgSpinner } from "react-icons/cg";
import { Toaster, toast } from "react-hot-toast";
import { auth } from "../../firebase";

const OTP = () => {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => {},
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
        setShowOTP(true);
        toast.success("OTP sended successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <section className="flex items-center justify-center h-screen">
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div
          id="recaptcha-container"
          className="w-80 flex flex-col gap-4 rounded-lg p-4"
        >
          <h1 className="text-center leading-normal text-black font-medium text-3xl mb-6">
            Xác nhận số điện thoại
          </h1>
          {showOTP ? (
            <>
              <div className="bg-white text-black-500 w-fit mx-auto p-4 rounded-full">
                <BsFillShieldLockFill size={30} />
              </div>
              <label
                htmlFor="otp"
                className="font-bold text-2xl text-black text-center"
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
                className=""
              />
              <button
                onClick={onOTPVerify}
                className="bg-white-600 w-full flex gap-1 items-center justify-center py-2.5 text-black rounded"
              >
                {loading && (
                  <CgSpinner size={20} className="mt-1 animate-spin" />
                )}
                <span>Xác nhận OTP</span>
              </button>
            </>
          ) : (
            <>
              <div className="bg-white text-black-500 w-fit mx-auto p-4 rounded-full">
                <BsTelephoneFill size={30} />
              </div>
              <label
                htmlFor=""
                className="font-bold text-2xl text-black text-center"
              >
                Nhập số điện thoại của bạn
              </label>
              <PhoneInput country={"vn"} value={ph} onChange={setPh} />
              <button
                onClick={onSignup}
                className="bg-white-600 w-full flex gap-1 items-center justify-center py-2.5 text-black rounded"
              >
                {loading && (
                  <CgSpinner size={20} className="mt-1 animate-spin" />
                )}
                <span>Gửi OTP</span>
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default OTP;
