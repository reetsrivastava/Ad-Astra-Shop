import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {useAddress} from "../../contexts/AddressContext";
import {useCart} from "../../contexts/CartContext";
import {Toast} from "../../utils/Toast";
import {Spinner} from "../../utils/Spinner";

import axios from "axios";
import {useAuth} from "../../contexts/AuthContext";
import { API } from "../../constants";
import { displayRazorpay } from "../../paymentGateway";

export function OrderSummary () {

    const {selectedAddress} = useAddress();
    const navigate = useNavigate();
    const { uid } = useAuth();
    const path = useLocation()?.state?.from;

    const {name,address,state,city,locality,pincode} = selectedAddress;
    const {cart,totalCartValue,emptyCart} = useCart();

    const [success,setSuccess] = useState(false);
    const [spinner,setSpinner] = useState("");
    const [error,setError] = useState(false);

    useEffect(() => {
      window.scroll({ behavior:'smooth',top:0 });
      if(path !== "address"){
        navigate("*")
      }
    },[path,navigate])

    const handleOrder = async() => {
        setSpinner(true)
        const orderDetails = {
           uid,
           products:cart.map( i => ({
                product:i.product._id,
                name:i.product.name,
                quantity:i.quantity,
                price:i.product.price
              }))
           ,
           address:selectedAddress
        }
        try {
              displayRazorpay();
             await axios.post(`${API}/api/orders`,orderDetails);
             setSpinner(false);
             setSuccess(true);
             setTimeout( () => {
                navigate("/")
                emptyCart(setError)
             },3000)
        } catch (error) {
          setSpinner(false);
          setError(true);
          setTimeout( () => {
            setError("")
         },3000)
        }
        
    }

    return (
        <div className="order_summary_container">
          <Toast show={success} onClick={() => setSuccess(false)} message="Order Placed successfully" background="var(--secondary)" color="var(--primary)"/>
          <Toast show={error} onClick={() => setError(false)} message="Something went wrong with server" error={true} background="var(--danger-color)" color="var(--tertiary)"/>
          
          <Spinner show={spinner}/>
            <h2 className="order_summary_container_header">Order Summary</h2>
            <div>
                <p><strong>Delivered to:</strong>&nbsp;<small> {name}, {address} ,{city?.toUpperCase()} , {state?.toUpperCase()} , {locality} , {pincode} , India</small></p>
                <ul>
                   {
                       cart.map( i => (
                           <li key={i.product._id}>
                              <h5>{i.product.name}</h5>
                              <div className="order_summary">
                                <img alt="" width="150" height="100" src={i.product.image+`?random=${Math.round(Math.random() * 1000)}`}/>
                                <div className="order_summary_content">
                                  <small>Price : ₹{i.product.price}</small>
                                  <small>Quantity : {i.quantity}</small>
                                  <small><strong>Total price : ₹{i.quantity*i.product.price}</strong></small>
                                </div>
                              </div>
                           </li>
                       ))
                   }
                </ul>
                <div className="final_checkout">
                  <h5 className="totalCartValue">Total Cart Value : ₹{totalCartValue}</h5>
                  <button className="primary-btn" onClick={handleOrder}>Place order
                  </button>
                  
                </div>
                <br/>
            </div>
        </div>
    )
}

export default OrderSummary;
