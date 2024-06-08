// AppRoutes.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import StaffScreen from './managers/staff/StaffScreen';
import Footer from './users/component/Footer';
import Signup from './users/component/Signup';
import Login from './users/component/Login';
import LoginEmail from './users/component/LoginEmail';
import LoginSuccess from './users/component/LoginSuccess';
import Product1 from './users/component/Product1';
import Termofuse from './users/component/Termofuse';
import VoucherStore from './users/component/VoucherStore';
import ShoppingCart from './users/component/ShoppingCart';
import Bigsales from './users/component/Bigsales';
import Dealsoc from './users/component/Dealsoc';
import News from './users/component/News';
import Header from './users/component/Header';
import ListProductMomScreen from './users/ui-list-product-mom/ListProductMomScreen';
import ListProductBbScreen from './users/ui-list-product-mom/ListProductBbScreen';
import AllProductScreen from './users/ui-list-product-mom/AllProductScreen';
import ProductScreen from './users/ui-product-mom/ProductScreen';
import { useSelector } from 'react-redux';

const DefaultLayout = () => (
    <>
        <Header />
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/login-email/:email" element={<LoginEmail />} />
            <Route path="/LoginSuccess/:token" element={<LoginSuccess />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/Termofuse" element={<Termofuse />} />
            <Route path="/voucher" element={<VoucherStore />} />
            <Route path="/ShoppingCart" element={<ShoppingCart />} />
            <Route path="/Bigsales" element={<Bigsales />} />
            <Route path="/News" element={<News />} />
            <Route path="/" element={<Product1 />} />
            <Route path="/all-products/:keyword" element={<AllProductScreen />} />
            <Route path="/sua-cho-be" element={<ListProductBbScreen />} />
            <Route path="/sua-cho-me" element={<ListProductMomScreen />} />
            <Route path="/product/:productId" element={<ProductScreen />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Footer />
    </>
);

const AppRoutes = () => {
    const { role } = useSelector((state) => state.auth);

    return (
        <Routes>
            {role === 2 ? (
                <Route path="/*" element={<StaffScreen />} />
            ) : (
                <Route path="/*" element={<DefaultLayout />} />
            )}
        </Routes>
    );
};

export default AppRoutes;
