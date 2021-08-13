import React,{ createContext,useContext } from 'react';
import {WishlistReducer} from '../reducers/WishlistReducer';

export const wishlistContext = createContext();

export const WishlistContextProvider = ({children}) => {

   const {wishlist,dispatch,handleWishlist} = WishlistReducer()
    
    return(
        <wishlistContext.Provider value={{wishlist,dispatchWishlist:dispatch,handleWishlist}}>
             {children}
        </wishlistContext.Provider>
    );
};

export const useWishlist = () => {
    return useContext(wishlistContext)
};