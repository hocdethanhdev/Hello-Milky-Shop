import React, { useMemo } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "./users/component/Header";
import Footer from "./users/component/Footer";
import Sidebar from "./managers/staff/Slidebar";

// Staff Components
import Dashboard from "./managers/staff/Dashboard";
import Voucher from "./managers/staff/Voucher";
import Report from "./managers/staff/Report";
import Posts from "./managers/staff/Posts";
import Confirm from "./managers/staff/Confirm";
import Products from "./managers/staff/Products";
import VoucherAdd from "./managers/staff/VoucherAdd";
import ProductAdd from "./managers/staff/ProductAdd";
import PostsAdd from "./managers/staff/PostsAdd";

// Admin Components (if needed)
import MainDash from "./managers/admin/MainDash";
import MangageAdmin from "./managers/admin/ManageAdmin";
import ManageStaff from "./managers/admin/ManageStaff";
import ManageMember from "./managers/admin/ManageMember";
import SignupSt from "./managers/admin/SignupSt";
import SignupMem from "./managers/admin/SignupMem";

// User Components
import Product1 from "./users/component/Product1";
import Login from "./users/component/Login";
import Signup from "./users/component/Signup";
import LoginEmail from "./users/component/LoginEmail";
import LoginSuccess from "./users/component/LoginSuccess";
import Termofuse from "./users/component/Termofuse";
import VoucherStore from "./users/component/VoucherStore";
import ShoppingCart from "./users/component/ShoppingCart";
import Bigsales from "./users/component/Bigsales";
import Dealsoc from "./users/component/Dealsoc";
import Profile from "./users/profileaccount/profile";
import Account from "./users/profileaccount/account";
import Address from "./users/profileaccount/address";
import ProductScreen from "./users/ui-product-mom/ProductScreen";
import AllProductScreen from "./users/ui-list-product-mom/AllProductScreen";
import ListProductBbScreen from "./users/ui-list-product-mom/ListProductBbScreen";
import ListProductMomScreen from "./users/ui-list-product-mom/ListProductMomScreen";
import RichTextEditor from "./users/component/RichTextEditor";
import ResetPassword from './users/component/ResetPassword';
import News from "./users/component/News";


function App() {
  const { role } = useSelector((state) => state.auth);

  // Staff Routes
  const staffRoutes = useMemo(() => (
    <div className="d-flex">
      <Sidebar />
      <div className="content flex-grow-1">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/voucher-staff" element={<Voucher />} />
          <Route path="/report" element={<Report />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/confirm" element={<Confirm />} />
          <Route path="/products" element={<Products />} />
          <Route path="/addingvoucher" element={<VoucherAdd />} />
          <Route path="/addingproduct" element={<ProductAdd />} />
          <Route path="/addingpost" element={<PostsAdd />} />
        </Routes>
      </div>
    </div>
  ), []);

  // Default Routes
  const defaultRoutes = useMemo(() => (
    <Routes>
      <Route path="/" element={<Product1 />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login-email/:email" element={<LoginEmail />} />
      <Route path="/LoginSuccess/:token" element={<LoginSuccess />} />
      <Route path="/Termofuse" element={<Termofuse />} />
      <Route path="/voucher" element={<VoucherStore />} />
      <Route path="/ShoppingCart" element={<ShoppingCart />} />
      <Route path="/Bigsales" element={<Bigsales />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/Account" element={<Account />} />
      <Route path="/Address" element={<Address />} />
      <Route path="/product/:productId" element={<ProductScreen />} />
      <Route path="/dealsoc/:promotionId" component={Dealsoc} />
      <Route path="/all-products/:keyword" element={<AllProductScreen />} />
      <Route path="/sua-cho-be" element={<ListProductBbScreen />} />
      <Route path="/sua-cho-me" element={<ListProductMomScreen />} />
      <Route path="/RichTextEditor" element={<RichTextEditor />} />
      <Route path="/ResetPassword" element={<ResetPassword />} />
      <Route path="/ResetPassword" element={<ResetPassword />} />
      <Route path="/News" element={<News/>} />
     
    </Routes>
  ), []);

  return (
    <div>
      <Router>
        <Header />
        {role === 2 ? staffRoutes : defaultRoutes}
        <Footer />
      </Router>
    </div>
  );
}

export default App;
