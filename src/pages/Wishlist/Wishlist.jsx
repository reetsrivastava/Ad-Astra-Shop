import React, { useEffect, useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishContext';
import {Toast} from "../../utils/Toast";
import { useThrottle } from "../../utils/throttle";
import { Link } from 'react-router-dom';
import { Empty } from '../../utils/Empty';

export const Wishlist = () => {

  useEffect(() => {
    window.scroll({ behavior:'smooth',top:0 });
  },[])

  const {wishlist} = useWishlist();
  const {cart } = useCart();
  const [error,setError] = useState(false);

  const {throttleAddToCart,throttleHandleWishlist} = useThrottle();

  return (
      <div className="wishlist-container">
          <Toast show={error} onClick={() => setError(false)} message="Something went wrong with server" error={true} background="red" color="white"/>

        <h1 style={{textAlign: 'center',marginTop:"1rem"}}>Wishlist ({wishlist.length})</h1>
        <div style={{display: wishlist.length > 0 ? 'grid': "block"}}  className="products">
              {
                 wishlist.length > 0 ? wishlist.map( item => (
                    <div key={item._id} className={ item.stock ? "card" : "card out-of-stock"}>
                      <div className="remove-icon">
                        <i onClick={() => throttleHandleWishlist(item,()=>{},setError)} style={{ color:'rgb(223, 71, 89)' }} className="fa fa-trash" aria-hidden="true"></i>
                      </div>
                      <Link to={`/products/${item._id}`}>
                        <img alt="product" className="card-img" src={item.image+`?random=${Math.round(Math.random() * 1000)}`} />
                     </Link>
                      <div className="card-content">
                        <h4>{item.name}</h4>
                        <small className="card-content-details">Price:{item.price}</small>
                        { item.fastDelivery && <small className="card-content-details"><i className="fas fa-shipping-fast"></i> Fast Delivery</small>}
                      </div>
                      <button onClick={() => {
                         throttleAddToCart(item,()=>{},setError);
                         throttleHandleWishlist(item,()=>{},setError)
                        } } disabled={!item.stock || cart.find((i) => i.product._id === item._id)} className="primary-btn">{!item.stock
                          ? "Out of Stock"
                          : cart.find((i) => i.product._id === item._id)
                          ? "Already in cart"
                          : "Move to cart"}</button>
                    </div>
                  ))
              : (
                <Empty value="Wishlist" />
              )}
        </div>
        </div>
    );
};