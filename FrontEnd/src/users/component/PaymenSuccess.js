import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getUserIdFromToken } from "../store/actions/authAction";
import { useSelector } from "react-redux";
import axios from "axios";

const LoginSuccess = () => {
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const params = new URLSearchParams(location.search);
  let status = params.get("status");

  useEffect(() => {
    const checkoutOrder = async (orderID, totalAmount, userIdd) => {
      try {
        const storedProductQuantities = localStorage.getItem(
          "productQuantitiesToUpdate"
        );

        // Make the first API request to update product quantities
        await axios.post(
          "http://localhost:5000/api/v1/order/changeQuantityOfProductInOrder",
          {
            orderID: orderID,
            productQuantities: JSON.parse(storedProductQuantities),
          }
        );

        localStorage.removeItem("productQuantitiesToUpdate");

        // Make the second API request to update the total amount
        await axios.post(
          "http://localhost:5000/api/v1/order/updateTotalAmountOfOrder",
          {
            orderID: orderID,
            totalAmount: totalAmount,
          }
        );

        localStorage.removeItem("totalAmount");

        // Make the third API request to update the order status
        await axios.post(
          `http://localhost:5000/api/v1/order/updateStatusOrderID/${orderID}`,
          {
            statusOrderID: 1,
          }
        );

        localStorage.removeItem("orderID");

        // Make the fourth API request to checkout the order
        await axios.post(`http://localhost:5000/api/v1/order/checkoutOrder`, {
          userID: userIdd,
        });

        alert("Giao dịch thành công"); // Move this alert here to ensure it only triggers on successful transaction
      } catch (err) {
        console.error("Error fetching:", err);
      }
    };

    const handlePaymentFailure = (code) => {
      switch (code) {
        case "07":
          alert("Trừ tiền thành công. Giao dịch bị nghi ngờ...");
          break;
        case "09":
          alert(
            "Giao dịch không thành công do: Thẻ chưa đăng ký Internet Banking..."
          );
          break;
        case "10":
          alert(
            "Giao dịch không thành công do: Xác thực thông tin không đúng quá 3 lần..."
          );
          break;
        case "11":
          alert("Giao dịch không thành công do: Hết hạn chờ thanh toán...");
          break;
        case "12":
          alert("Giao dịch không thành công do: Thẻ bị khóa...");
          break;
        case "24":
          alert("Giao dịch không thành công do: Hủy giao dịch...");
          break;
        case "51":
          alert("Giao dịch không thành công do: Tài khoản không đủ số dư...");
          break;
        case "65":
          alert(
            "Giao dịch không thành công do: Vượt quá hạn mức giao dịch trong ngày..."
          );
          break;
        case "75":
          alert("Ngân hàng thanh toán đang bảo trì...");
          break;
        case "79":
          alert(
            "Giao dịch không thành công do: Nhập sai mật khẩu quá số lần quy định..."
          );
          break;
        case "99":
          alert("Giao dịch lỗi...");
          break;
        default:
          alert("Giao dịch không thành công. Mã lỗi: " + code);
      }
    };

    const code = params.get("code");
    const userIdd = getUserIdFromToken(token);

    if (status === "1") {
      const orderID = localStorage.getItem("orderID");
      const totalAmount = localStorage.getItem("totalAmount");

      checkoutOrder(orderID, parseInt(totalAmount), userIdd);
    } else if (status === "0") {
      handlePaymentFailure(code);
    }
  }, []);

  return <Navigate to="/" replace />;
};

export default LoginSuccess;
