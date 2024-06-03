import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './managers/staff/Navbar';
import Dashboard from './managers/staff/Dashboard';
import Voucher from './managers/staff/Voucher';
import Report from './managers/staff/Report';
import Posts from './managers/staff/Posts';
import Confirm from './managers/staff/Confirm';
import Products from './managers/staff/Products';
import './App.css';
import Sidebar from './managers/staff/Slidebar';
import Footer from './users/component/Footer';
import VoucherAdd from './managers/staff/VoucherAdd';
import ProductAdd from './managers/staff/ProductAdd';
import PostsAdd from './managers/staff/PostsAdd';
import AdminSlidebar from './managers/admin/AdminSlidebar';
import MainDash from './managers/admin/MainDash';
import MangageAdmin from './managers/admin/ManageAdmin';
import ManageStaff from './managers/admin/ManageStaff';
import Signup from './users/component/Signup2';
import SignupSt from './managers/admin/SignupSt';
import ManageMember from './managers/admin/ManageMember';
import SignupMem from './managers/admin/SignupMem';
import ProductContentMom from './users/ui-product-mom/ProductContentMom';

import ProductDetail from './users/ui-product-mom/ProductDetailMom';
import NavCate from './users/ui-product-mom/NavCate';
import RelatedProducts from './users/ui-product-mom/RelatedProductMom';
// import Footer from './users/component/Footer';
import Header from './users/component/Header';
import Login from './users/component/Login';
import Menu from './users/component/Menu';
import News from './users/component/News';
import Product1 from './users/component/Product1';
import ListProductMom from './users/ui-list-product-mom/ListProductMom';
import SliderMoney from './users/ui-list-product-mom/SliderMoney';
import ScrollToTopButton from './users/ui-product-mom/ScrollToTopButton';
import ThrowPage from './users/ui-list-product-mom/ThrowPage';



import Termofuse  from './users/component/Termofuse';
import VoucherStore from './users/component/VoucherStore';
import ShoppingCart from './users/component/ShoppingCart';
import Bigsales from './users/component/Bigsales';
import LoginEmail from './users/component/LoginEmail';


function App() {
  return (
    <div >
      <Router>

        <Header />
        <Routes>  
          <Route path="/ListProductMom" element={<ListProductMom/>} />
          <Route path="/" element={<Product1 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login-email/:email" element={<LoginEmail />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Termofuse" element={<Termofuse />} />
          <Route path="/voucher" element={<VoucherStore />} />
          <Route path="/ShoppingCart" element={<ShoppingCart />} />
          <Route path="/Bigsales" element={<Bigsales />} />
          <Route path="/News" element={<News />} />
          {/* Add more routes here as needed */}
        </Routes>
        <Footer />

      </Router>
    </div>
  );
}

export default App;
