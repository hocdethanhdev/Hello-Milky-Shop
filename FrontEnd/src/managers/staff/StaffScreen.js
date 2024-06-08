// StaffScreen.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Slidebar from './Slidebar';
import Dashboard from './Dashboard';
import Voucher from './Voucher';
import Report from './Report';
import Posts from './Posts';
import Confirm from './Confirm';
import Products from './Products';
import VoucherAdd from './VoucherAdd';
import ProductAdd from './ProductAdd';
import PostsAdd from './PostsAdd';

const StaffScreen = () => {
  return (
    <div>
      <Slidebar />
      <Routes>
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* <Route path="/voucher" element={<Voucher />} /> */}
        {/* <Route path="/report" element={<Report />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/products" element={<Products />} />
        <Route path="/voucher-add" element={<VoucherAdd />} />
        <Route path="/product-add" element={<ProductAdd />} />
        <Route path="/posts-add" element={<PostsAdd />} /> */}
        {/* Add more routes as needed */}
      </Routes>
    </div>
  );
};

export default StaffScreen;
