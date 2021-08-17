import { useReducer,useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';
import { API } from "../constants";

import axios from 'axios';

export const CartReducer = () => {

    const navigate = useNavigate();
    const { isUserloggedIn,uid } = useAuth();

    useEffect( () => {
      if(!isUserloggedIn){
        return;
      }
      ( async function(){
        try {
          const res = await axios.get(`${API}/api/carts/${uid}`);
          dispatch({ type:"UPDATE_CART",payload:res.data?.cart})
        } catch (error) {
          return dispatch({ type:"UPDATE_CART",payload:[]})
        }
      } )()
    },[uid,isUserloggedIn] )

    const cartReducer = (state,action) => {
        switch (action.type) {
            case "UPDATE_CART":
            return action.payload
            default:
            return state;
        }
    }
    const [state, dispatch] = useReducer(cartReducer,[]);

    const addToCart = async(item,loader,toast) => {
        if (!isUserloggedIn) {
          return navigate("/login");
        }
        if (state.find((i) => i.product._id === item._id)) {
          return navigate("/cart");
        }
        loader(true);
        try {
          const {data,status} = await axios.post(`${API}/api/carts/${uid}`,{productID:item._id,quantity:1});
          if(status === 200){
            dispatch({ type:"UPDATE_CART",payload:data.cart.products})
            loader(false);
          }
        } catch (error) {
          loader(false);
          toast(true)
          setTimeout( () => {
            toast(false)
          },2000) 
        }
       
    };

    const removeFromCart = async(productID,toast) => {
        try {
           const {data,status} = await axios.delete(`${API}/api/carts/${uid}/${productID}`)
           if(status === 200){
            dispatch({ type:"UPDATE_CART",payload:data.cart.products})
          }
        } catch (error) {
          toast(true)
          setTimeout( () => {
            toast(false)
          },2000) 
        }
    }

    const increaseQuantityOfProduct = async(productID,toast) => {
      try {
        const {data,status} = await axios.post(`${API}/api/carts/${uid}/${productID}/increasequantity`)
        if(status === 200){
          dispatch({ type:"UPDATE_CART",payload:data.cart.products})
        }
     } catch (error) {
      toast(true)
      setTimeout( () => {
        toast(false)
      },2000) 
     }
    }

    const decreaseQuantityOfProduct = async(productID,toast) => {
      try {
        const {data,status} = await axios.post(`${API}/api/carts/${uid}/${productID}/decreasequantity`);
        if(status === 200){
          dispatch({ type:"UPDATE_CART",payload:data.cart.products})
        }
     } catch (error) {
      toast(true)
      setTimeout( () => {
        toast(false)
      },2000) 
     }
    }

    const emptyCart = async(toast) => {
      try {
        const {data,status} = await axios.delete(`${API}/api/carts/${uid}`);
        if(status === 200){
          dispatch({ type:"UPDATE_CART",payload:data.cart.products})
        }
     } catch (error) {
        toast(true)
        setTimeout( () => {
          toast(false)
        },2000) 
     }
    }

    return {cart:state,emptyCart,addToCart,increaseQuantityOfProduct,decreaseQuantityOfProduct,removeFromCart}
};
