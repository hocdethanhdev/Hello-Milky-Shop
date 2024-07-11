import React, { useEffect } from "react";
import { login } from "../store/actions/authAction";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const LoginSuccess = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      dispatch(login(token));
      navigate("/", { replace: true });
    }
  }, [dispatch, token, navigate]);

  return null;
};

export default LoginSuccess;
