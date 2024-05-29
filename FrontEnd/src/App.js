import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./users/component/Header";
import Footer from "./users/component/Footer";
import Product1 from "./users/component/Product1";
import Login from "./users/component/Login";
import Signup from "./users/component/Signup";
import Termofuse from "./users/component/Termofuse";
import VoucherStore from "./users/component/VoucherStore";
import ShoppingCart from "./users/component/ShoppingCart"; // Đã sửa đường dẫn

import News from "./users/component/News";

function App() {
  return (
    <div>
      <Router>
        <Header />
       
        <Routes>
          <Route path="/" element={<Product1 />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Termofuse" element={<Termofuse/>} />
          <Route path="/voucher" element={<VoucherStore/>} />          
          <Route path="/ShoppingCart" element={<ShoppingCart/>} />
          <Route path="/News" element={<News/>}/>
          {/* Add more routes here as needed */}
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;