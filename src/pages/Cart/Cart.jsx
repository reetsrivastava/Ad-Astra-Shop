import React,{useEffect, useState} from "react";
import { useNavigate,Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useWishlist } from "../../contexts/WishContext";
import { useThrottle } from "../../utils/throttle";
import {Toast} from "../../utils/Toast";

export const Cart = () => {

  useEffect(() => {
    window.scroll({ behavior:'smooth',top:0 });
  },[])

  const navigate = useNavigate();

  const { wishlist } = useWishlist();
  const [error,setError] = useState(false);
  
  const { 
    cart,
    totalCartValue,
    totalCartItem 
  } = useCart();

  const {throttleDecreaseQuantity,throttleRemoveFromCart,throttleIncreaseQuantity,throttleHandleWishlist} = useThrottle();

  return (
    <div className="cart-container">
      <Toast show={error} onClick={() => setError(false)} message="Something went wrong with server" error={true} background="red" color="white"/>
      <h1>My Cart ( {totalCartItem} )</h1>
      {cart.length > 0 ? (
        cart.map((item) => (
          <div key={item.product._id} className="card-horizontal">
            <Link to={`/products/${item.product._id}`}>
               <img alt="product" className="card-img" src={item.product.image+`?random=${Math.round(Math.random() * 1000)}`} />
            </Link>
            <div className="card-body">
              <h4 className="card-title">
                {item.product.name}
              </h4>
              <div>
                <small>Price : ₹{item.product.price}</small>&nbsp;<br/><br/>
                <button
                  disabled={item.quantity <= 1}
                  onClick={() => throttleDecreaseQuantity(item.product._id,setError)}
                >
                  -
                </button>
                &nbsp;{item.quantity}&nbsp;
                <button
                  onClick={() =>throttleIncreaseQuantity(item.product._id,setError)}
                >
                  +
                </button>
              </div>
              <div className="card-footer">
               <div className="wishlist-icon">
               <i 
                  onClick={() => throttleHandleWishlist(item.product,()=>{},setError)}
                  style={{
                    color: wishlist.find((i) => i._id === item.product._id)
                      ? "var(--danger-color)"
                      : "var(--tertiary)",
                  }}
                  className="fa fa-heart fa-border"
                  aria-hidden="true"
                ></i>
               </div>
                <button
                  onClick={() => throttleRemoveFromCart(item.product._id,setError)}
                  className="secondary-btn"
                  style={{
                    padding:'0.2rem 0.5rem',
                    borderRadius:'2px'
                  }}
                >
                  REMOVE
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center" }}>Your cart is empty</p>
      )}
      {cart.length > 0 && (
        <>
          <h2>Total Price: ₹{totalCartValue}</h2>
          <button
            className="primary-btn"
            onClick={() => navigate("/address",{state:{from:"cart"}})}
          >
            Proceed to checkout
          </button>
        </>
      )}
    </div>
  );
};