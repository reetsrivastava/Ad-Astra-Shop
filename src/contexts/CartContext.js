import React,{ createContext,useContext } from 'react';
import {CartReducer} from '../reducers/CartReducer';

export const cartContext = createContext();

export const CartContextProvider = ({children}) => {

    const { 
        cart,
        removeFromCart,
        addToCart,
        increaseQuantityOfProduct,
        decreaseQuantityOfProduct,
        emptyCart 
    } = CartReducer();


    const getTotalCartValue = () => cart.reduce( (total,i) => parseInt(total) + parseInt(i?.product?.price * i?.quantity) , 0);
    const totalCartValue = getTotalCartValue();

    const getTotalCartItem = () =>  cart.reduce( (total,i) => parseInt(total) + parseInt(i?.quantity) , 0);
    const totalCartItem = getTotalCartItem();
    
    return(
        <cartContext.Provider value={{
            cart,
            removeFromCart,
            increaseQuantityOfProduct,
            decreaseQuantityOfProduct,
            totalCartValue,
            totalCartItem,
            addToCart,
            emptyCart
        }}>
             {children}
        </cartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(cartContext)
};