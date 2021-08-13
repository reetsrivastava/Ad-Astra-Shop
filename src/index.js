import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ProductContextProvider } from './contexts/ProductContext';
import { CartContextProvider } from './contexts/CartContext';
import { WishlistContextProvider } from './contexts/WishContext';
import { AddressContextProvider } from './contexts/AddressContext';
import { AuthContextProvider } from './contexts/AuthContext';

import { BrowserRouter as Router } from 'react-router-dom';


ReactDOM.render(
  <React.StrictMode>
   <Router>
     <AuthContextProvider>
      <AddressContextProvider>
        <ProductContextProvider>
          <WishlistContextProvider>
           <CartContextProvider>
              <App />
           </CartContextProvider>
         </WishlistContextProvider>
       </ProductContextProvider>
      </AddressContextProvider>
    </AuthContextProvider>
   </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

