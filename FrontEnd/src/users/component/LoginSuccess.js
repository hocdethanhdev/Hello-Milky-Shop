import React, { useEffect } from "react";
import { login } from "../store/actions/authAction";
import { useParams, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const LoginSuccess = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const { isLoggedIn, role } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(login(token));
    }
  }, [dispatch, token]);

  return (
    <div>
  {isLoggedIn && (
    (role === 2 && <Navigate to="/dashboard" replace />) || 
    ((role === 0 || role === 3) && <Navigate to="/" replace />) 
  )}
</div>

  );
};

export default LoginSuccess;
