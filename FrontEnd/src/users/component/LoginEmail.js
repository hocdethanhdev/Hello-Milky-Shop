import React, { useEffect } from "react";
import { loginEmail } from "../store/actions/authAction";
import { useParams, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const LoginEmail = () => {
  const { email } = useParams();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loginEmail(email));
  }, [email, dispatch]);
  
  return <div>{isLoggedIn && <Navigate to={"/"} replace={true} />}</div>;
};

export default LoginEmail;
