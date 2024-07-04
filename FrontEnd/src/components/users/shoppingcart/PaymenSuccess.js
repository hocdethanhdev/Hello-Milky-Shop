import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { getUserIdFromToken } from "../../store/actions/authAction";
import { toast } from "react-hot-toast";

const PaymemSuccess = () => {
  const { token } = useSelector((state) => state.auth);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  let status = params.get("status");

  useEffect(() => {
    const checkoutOrder = async (orderID, totalAmount) => {
      try {
        const storedProductQuantities = localStorage.getItem(
          "productQuantitiesToUpdate"
        );
        const list = JSON.parse(storedProductQuantities);

        if (list !== null) {
          localStorage.removeItem("productQuantitiesToUpdate");
          await axios.post(
            "http://localhost:5000/api/v1/order/changeQuantityOfProductInOrder",
            {
              orderID: orderID,
              productQuantities: list,
            }
          );
        }

        if (totalAmount) {
          await axios.post(
            "http://localhost:5000/api/v1/order/updateTotalAmountOfOrder",
            {
              orderID: orderID,
              totalAmount: totalAmount,
            }
          );
          localStorage.removeItem("totalAmount");
        }

        if (orderID) {
          await axios.post(
            `http://localhost:5000/api/v1/order/updateStatusOrderID/${orderID}`,
            {
              statusOrderID: 1,
            }
          );

          await axios.post(`http://localhost:5000/api/v1/order/checkoutOrder`, {
            orderID: orderID,
          });

          localStorage.removeItem("orderID");
        }
        const voucher = localStorage.getItem("selectedVoucher");
        if (voucher) {
          await axios.post(
            "http://localhost:5000/api/v1/voucher/removeVoucherFromUser",
            {
              userID: getUserIdFromToken(token),
              voucherID: parseInt(voucher),
            }
          );

          localStorage.removeItem("selectedVoucher");
        }

        const usePoints = localStorage.getItem("usePoints");
        if (usePoints === "true") {
          await axios.put("http://localhost:5000/api/v1/user/usePoint", {
            UserID: getUserIdFromToken(token),
          });

          localStorage.removeItem("usePoint");
        }
        toast.success("Giao dịch thành công", { duration: 7000 });
      } catch (err) {
        console.error("Error fetching:", err);
      }
    };
    const handlePaymentFailure = (code) => {
      const errorMessages = {
        "07": "Trừ tiền thành công. Giao dịch bị nghi ngờ...",
        "09": "Giao dịch không thành công do: Thẻ chưa đăng ký Internet Banking...",
        10: "Giao dịch không thành công do: Xác thực thông tin không đúng quá 3 lần...",
        11: "Giao dịch không thành công do: Hết hạn chờ thanh toán...",
        12: "Giao dịch không thành công do: Thẻ bị khóa...",
        24: "Giao dịch không thành công do: Hủy giao dịch...",
        51: "Giao dịch không thành công do: Tài khoản không đủ số dư...",
        65: "Giao dịch không thành công do: Vượt quá hạn mức giao dịch trong ngày...",
        75: "Ngân hàng thanh toán đang bảo trì...",
        79: "Giao dịch không thành công do: Nhập sai mật khẩu quá số lần quy định...",
        99: "Giao dịch lỗi...",
      };

      if (errorMessages[code]) {
        toast.error(errorMessages[code], { duration: 7000 });
      } else {
        toast.error(`Giao dịch không thành công. Mã lỗi: ${code}`, {
          duration: 7000,
        });
      }
    };

    const transferOrderDetailsToNewOrder = async (orderID) => {
      await axios.post(
        "http://localhost:5000/api/v1/order/transferOrderDetailsToNewOrder",
        {
          OrderID: orderID,
        }
      );
      localStorage.removeItem('orderID');
      localStorage.removeItem('usePoints');
      localStorage.removeItem('productQuantitiesToUpdate');
      localStorage.removeItem('totalAmount');
    };

    const code = params.get("code");
    const orderID = localStorage.getItem("orderID");
    const totalAmount = localStorage.getItem("totalAmount");
    if (status === "1") {
      checkoutOrder(orderID, totalAmount);
    } else if (status === "0" && code) {
      transferOrderDetailsToNewOrder(orderID);
      handlePaymentFailure(code);
    }
  });

  return <Navigate to="/" replace />;
};

export default PaymemSuccess;
