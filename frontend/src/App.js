import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Admin Components
import Dashboard from "./Admin/Dashboard";
import RegisteredUser from "./Admin/RegisteredUser";
import ProductList from "./Admin/Productist";
import Orders from "./Admin/Orders";
import Invoice from "./Admin/Invoice";
import AddProducts from "./Admin/AddProducts";
import Category from "./Admin/Categorey";


// Frontend Components
import Product from "./Frontend/component/Product";
import Productlist from "./Frontend/component/productlist";
import Cart from "./Frontend/component/cart";

import Home from "./Frontend/Home";
import Signin from "./Frontend/login/Signin";
import Signup from "./Frontend/login/Signup";
import PrivacyPolicy from "./Frontend/Privacy/Privacy";
import AdBanner from "./Admin/Banner";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Frontend Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/Productlist/:productId" element={<Productlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signin" element={< Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />


        {/* Admin Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/Adbanners" element={<AdBanner />} />
        <Route path="/registered-user" element={<RegisteredUser />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/add-product" element={<AddProducts />} />
        <Route path="/category" element={<Category />} />
    
      </Routes>
    </BrowserRouter>
  );
}

export default App;
