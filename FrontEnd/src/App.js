import React, { useMemo } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Sidebar from "./components/managers/staff/Slidebar";

// Staff Components
import Dashboard from "./components/managers/staff/Dashboard";
import Voucher from "./components/managers/staff/Voucher";
import Report from "./components/managers/staff/Report";
import Posts from "./components/managers/staff/Posts";
import Confirm from "./components/managers/staff/Confirm";
import Products from "./components/managers/staff/Products";
import VoucherAdd from "./components/managers/staff/VoucherAdd";
import ProductAdd from "./components/managers/staff/ProductAdd";
import PostsAdd from "./components/managers/staff/PostsAdd";
import PromotionManage from "./components/managers/staff/PromotionManage";
import AddPromotion from "./components/managers/staff/AddPromotion";
import FeedbackManage from "./components/managers/staff/FeedbackManage";
import AnsweredFeedbackManage from "./components/managers/staff/AnsweredFeedbackManage";
// Admin Components (if needed)
import MainDash from "./components/managers/admin/MainDash";
import MangageAdmin from "./components/managers/admin/ManageAdmin";
import ManageStaff from "./components/managers/admin/ManageStaff";
import ManageMember from "./components/managers/admin/ManageMember";
import SignupSt from "./components/managers/admin/SignupSt";
import AdminSlidebar from "./components/managers/admin/AdminSlidebar";
import SignupAd from "./components/managers/admin/SignupAd";
// User Components
import Product1 from "./components/users/homepage/Product1";
import Login from "./components/account/Login";
import Signup from "./components/account/Signup";
import LoginEmail from "./components/account/LoginEmail";
import LoginSuccess from "./components/account/LoginSuccess";
import Termofuse from "./components/account/Termofuse";
import VoucherStore from "./components/users/homepage/VoucherStore";
import ShoppingCart from "./components/users/shoppingcart/ShoppingCart";
import Bigsales from "./components/users/bigsales/Bigsales";
import Profile from "./components/users/profileaccount/profile";
import Account from "./components/users/profileaccount/account";
import Address from "./components/users/profileaccount/address";
import ProductScreen from "./components/users/product/ui-product-mom/ProductScreen";
import AllProductScreen from "./components/users/product/ui-list-product-mom/AllProductScreen";
import ListProductBbScreen from "./components/users/product/ui-list-product-mom/ListProductBbScreen";
import ListProductMomScreen from "./components/users/product/ui-list-product-mom/ListProductMomScreen";
import RichTextEditor from "./components/managers/richtext/RichTextEditor";
import ResetPassword from "./components/account/ResetPassword";
import News from "./components/users/news/News";
import NewsDetail from "./components/users/news/NewsDetail";
import ProductHot from "./components/users/news/ProductHot";
import PaymentSuccess from "./components/users/shoppingcart/PaymenSuccess";
import ChangePassword from "./components/users/profileaccount/ChangePassword";
import Shipping from "./components/shipping/shipping";
import CancelOrder from "./components/managers/staff/CancelOrder";
import ShippingOrder from "./components/managers/staff/ShippingOrder";
import DoneOrder from "./components/managers/staff/DoneOrder";
import EditArticletModal from "./components/managers/staff/EditArticleModal";
import ChatPage from "./components/managers/staff/ChatStaff";

function App() {
  const { role } = useSelector((state) => state.auth);

  // Staff Routes
  const staffRoutes = useMemo(
    () => (
      <div className="d-flex">
        <Sidebar />
        <div className="content flex-grow-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/chat-page" element={<ChatPage />} />
            <Route path="/voucher-staff" element={<Voucher />} />
            <Route path="/report" element={<Report />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/confirm" element={<Confirm />} />
            <Route path="/products" element={<Products />} />
            <Route path="/addingvoucher" element={<VoucherAdd />} />
            <Route path="/addingproduct" element={<ProductAdd />} />
            <Route path="/addingpost" element={<PostsAdd />} />
            <Route path="/promotionmanage" element={<PromotionManage />} />
            <Route path="/addpromotion" element={<AddPromotion />} />
            <Route path="/feedbackManage" element={<FeedbackManage />} />
            <Route path="/cancel-order" element={<CancelOrder />} />
            <Route path="/order-in-transit" element={<ShippingOrder />} />
            <Route path="/completed-order" element={<DoneOrder />} />
            <Route
              path="/edit-article/:articleID"
              element={<EditArticletModal />}
            />
            <Route
              path="/respondedFeedback"
              element={<AnsweredFeedbackManage />}
            />
          </Routes>
        </div>
      </div>
    ),
    []
  );

  // Default Routes
  const defaultRoutes = useMemo(
    () => (
      <Routes>
        <Route path="/PaymentSuccess" element={<PaymentSuccess />} />
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
        <Route path="/all-products/:keyword" element={<AllProductScreen />} />
        <Route path="/all-products" element={<AllProductScreen />} />
        <Route path="/sua-cho-be" element={<ListProductBbScreen />} />
        <Route path="/sua-cho-me" element={<ListProductMomScreen />} />
        <Route path="/RichTextEditor" element={<RichTextEditor />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/News" element={<News />} />
        <Route path="/NewsDetail/:id" element={<NewsDetail />} />
        <Route path="/ProductHot" element={<ProductHot />} />
        <Route path="/ChangePassword" element={<ChangePassword />} />
      </Routes>
    ),
    []
  );
  const adminRoutes = useMemo(
    () => (
      <div className="d-flex">
        <AdminSlidebar />
        <div className="content flex-grow-1">
          <Routes>
            <Route path="/" element={<MainDash />} />
            <Route path="/manage-admin" element={<MangageAdmin />} />
            <Route path="/manage-staff" element={<ManageStaff />} />
            <Route path="/adding-account-admin" element={<SignupAd />} />
            <Route path="/adding-account-staff" element={<SignupSt />} />
            <Route path="/manage-member" element={<ManageMember />} />
          </Routes>
        </div>
      </div>
    ),
    []
  );
  const shipperRoutes = useMemo(
    () => (
      <div className="d-flex">
        <div className="content flex-grow-1">
          <Routes>
            <Route path="/" element={<Shipping />} />
          </Routes>
        </div>
      </div>
    ),
    []
  );
  return (
    <div>
      <Router>
        <Header />
        {role === 1
          ? adminRoutes
          : role === 2
          ? staffRoutes
          : role === 4
          ? shipperRoutes
          : defaultRoutes}

        <Footer />
      </Router>
    </div>
  );
}

export default App;
