import React, { useEffect, useState } from "react";
import { login } from "../store/actions/authAction";
import { useParams, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const LoginSuccess = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (token) {
      dispatch(login(token)).then(() => {
        setLoading(true);
      });
    }
  }, [dispatch, token]);

  const { isLoggedIn, role } = useSelector((state) => state.auth);

  if (!loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <div>
      {isLoggedIn ? (
        (role === 2 && <Navigate to="/dashboard" replace />) ||
        (role === 3 && <Navigate to="/" replace />)
      ) : <Navigate to="/" replace />}
    </div>

  );
};

export default LoginSuccess;
