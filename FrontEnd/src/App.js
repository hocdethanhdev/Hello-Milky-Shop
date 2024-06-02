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
import Footer2 from './managers/staff/Footer';
import VoucherAdd from './managers/staff/VoucherAdd';
import ProductAdd from './managers/staff/ProductAdd';
import PostsAdd from './managers/staff/PostsAdd';
import AdminSlidebar from './managers/admin/AdminSlidebar';
import MainDash from './managers/admin/MainDash';
import MangageAdmin from './managers/admin/ManageAdmin';
import ManageStaff from './managers/admin/ManageStaff';
import Signup from './managers/admin/SignupAd';
import SignupSt from './managers/admin/SignupSt';
import ManageMember from './managers/admin/ManageMember';
import SignupMem from './managers/admin/SignupMem';
import ProductContentMom from './users/ui-product-mom/ProductContentMom';

import ProductDetail from './users/ui-product-mom/ProductDetailMom';
import NavCate from './users/ui-product-mom/NavCate';
import RelatedProducts from './users/ui-product-mom/RelatedProductMom';
import Footer from './users/component/Footer';
import Header from './users/component/Header';
import Login from './users/component/Login';
import Menu from './users/component/Menu';
import News from './users/component/News';
import Product1 from './users/component/Product1';
import ListProductMom from './users/ui-list-product-mom/ListProductMom';
import SliderMoney from './users/ui-list-product-mom/SliderMoney';
import ScrollToTopButton from './users/ui-product-mom/ScrollToTopButton';
import ThrowPage from './users/ui-list-product-mom/ThrowPage';


function App() {
  return (
    <div >
      <Router>

        <Navbar />
        <NavCate />
        <div className='some row'>
          <div className='some-thang col-md-2'>
            {/* <Sidebar /> */}
            {/* <AdminSlidebar /> */}

          </div>

          <div className='col-md-10'>
            <ProductContentMom />
            {/* <ListProductMom /> */}
            <div className='row'>


              <div className='col-md-9'>
                <ProductDetail />
              </div>
              <div className='col-md-3'>
                <RelatedProducts />
              </div>
            </div>

            <ScrollToTopButton />
            <Routes>

              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/voucher" element={<Voucher />} />
              <Route path="/report" element={<Report />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/confirm" element={<Confirm />} />
              <Route path="/products" element={<Products />} />
              <Route path="/addingvoucher" element={<VoucherAdd />} />
              <Route path="/addingproduct" element={<ProductAdd />} />
              <Route path="/addingpost" element={<PostsAdd />} />
              <Route path="/manage-admin" element={<MangageAdmin />} />
              <Route path="/admin-dashboard" element={<MainDash />} />
              <Route path="/adding-account-admin" element={<Signup />} />
              <Route path="/manage-staff" element={<ManageStaff />} />
              <Route path="/adding-account-staff" element={<SignupSt />} />
              <Route path="/manage-member" element={<ManageMember />} />
              <Route path="/adding-account-member" element={<SignupMem />} />
            </Routes>


          </div>




        </div>
        <Footer2 />
      </Router>
    </div>
  );
}

export default App;
