import React, { useEffect } from "react";
import { login } from "../store/actions/authAction";
import { useParams, Navigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const LoginSuccess = () => {
  const { token } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(login(token));
    }
  }, [dispatch, token]);

  return (
    <Link to="/" replace />
  );
};

export default LoginSuccess;
