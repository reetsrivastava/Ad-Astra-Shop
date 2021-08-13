import { useState } from "react";
import { useCart } from "../../contexts/CartContext";
import { useWishlist } from "../../contexts/WishContext";
import { Link } from 'react-router-dom';
import {BtnSpinner} from '../../utils/BtnSpinner';
import {Toast} from '../../utils/Toast';
import { useThrottle } from '../../utils/throttle';

export const ProductContent = ({item}) => {

    const { cart } = useCart();
    const { wishlist } = useWishlist();
    const [loaderForCart,setLoaderForCart] = useState(false);
    const [loaderForWishlist,setLoaderForWishlist] = useState(false);
    const [error,setError] = useState(false);

    const {throttleAddToCart,throttleHandleWishlist} = useThrottle();

    return (
        <div key={item._id} className={item.stock ? "card" : "card out-of-stock"}>
            <Toast show={error} onClick={() => setError(false)} message="Something went wrong with server" error={true} background="red" color="white"/>
            <div className="wishlist-icon">
              {  !loaderForWishlist && 
                 <button className="wishlist-button" onClick={() => throttleHandleWishlist(item,setLoaderForWishlist,setError)} >
                   <i style={{ color: wishlist.find((i) => i?._id === item?._id) ? "var(--danger-color)" : "var(--tertiary)", margin: '0.25rem'}} className="fa fa-heart" aria-hidden="true"></i>
                 </button>
              }
              <BtnSpinner show={loaderForWishlist}/> 
            </div>

            <Link to={`/products/${item._id}`}>
              <img alt="product" className="card-img" src={item.image+`?random=${Math.round(Math.random() * 1000)}`} />
            </Link>

            <div className="card-content">
              <h4>{item.name}</h4>
              {item.fastDelivery && (
                <small className="card-content-details"><i className="fas fa-shipping-fast"></i> Fast Delivery</small>
              )}
              <small className="price">₹ {item.price}</small>
              
            </div>
            
            

            <button onClick={() => throttleAddToCart(item,setLoaderForCart,setError)}  className="primary-btn">
              { !loaderForCart && (item.stock ? (cart.find((i) => i?.product._id === item?._id) ? "GO TO CART" : "ADD TO CART") : "OUT OF STOCK")}
              <BtnSpinner show={loaderForCart}/>
            </button>
            
          </div>
    )
}
