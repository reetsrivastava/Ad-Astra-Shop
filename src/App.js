import React from "react";

import { Routes,Route } from 'react-router-dom';

import {Header} from './utils/Header';
import {PrivateRoute} from "./utils/PrivateRoute";

import {Login} from "./Auth/Login";
import {SignUp} from "./Auth/SignUp";

import {Cart} from "./pages/Cart/Cart";
import {ProductListing} from "./pages/Home/ProductListing";
import {Wishlist} from "./pages/Wishlist/Wishlist";
import {DisplayAddresses} from "./pages/Address/DisplayAddresses";
import {EditAddress} from "./pages/Address/EditAddress";
import {AddNewAddress} from "./pages/Address/AddNewAddress";

import { useAuth } from "./contexts/AuthContext";

import {Profile} from "./pages/Profile/Profile";
import {ProductPage} from "./pages/ProductPage/ProductPage";
import {RouteNotFound} from "./utils/RouteNotFound";

import "./App.css";

const App = () => {

  const { isUserloggedIn } = useAuth();

  return (
    <div className="container">
       <Header/>
       <Routes>
          { !isUserloggedIn && <Route path="/login" element={<Login/>}/>}
          { !isUserloggedIn && <Route path="/signup" element={<SignUp/>}/>}

          <Route path="/" element={<ProductListing/>}/>
          <Route path="/products/:productId" element={<ProductPage/>}/>
          
          <PrivateRoute path="/wishlist" element={<Wishlist/>}/>
          <PrivateRoute path="/cart" element={<Cart/>}/>
          <PrivateRoute path="/address" element={<DisplayAddresses/>}/>
          <PrivateRoute path="/editaddress" element={<EditAddress/>}/>
          <PrivateRoute path="/newaddress" element={<AddNewAddress/>}/>
          <PrivateRoute path="/myaccount" element={<Profile/>}/>
          
          <Route path="*" element={<RouteNotFound/>}/>
       </Routes>

    </div>
  );
};

export default App;