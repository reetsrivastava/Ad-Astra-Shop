import { useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useWishlist } from "../contexts/WishContext";
import { useAuth } from "../contexts/AuthContext";
import {Sidebar} from "./Sidebar";
import {Backdrop} from "./Backdrop";

export const Header = () => {
  const { totalCartItem } = useCart();
  const { wishlist } = useWishlist();
  const navigate = useNavigate();

  const { userDetails,isUserloggedIn } = useAuth();

  const [showSidebar,setShowSidebar] = useState(false); 

    return (
        <nav className="nav">
            <Backdrop show={showSidebar} onClick={() => setShowSidebar(false)}/>
            <Sidebar className={showSidebar ? "show__sidebar" : ""} setShowSidebar={setShowSidebar}/>
        <ul>
          <li>
            <i style={{fontSize:'1.2rem'}} className="fa fa-bars" onClick={() => setShowSidebar(true)}></i>
          </li>

          <li style={{ flexGrow: 1 }}>
             <NavLink to="/" className="nav-link site__name">Ad AstraShop</NavLink>
          </li>
          
          { userDetails && isUserloggedIn && 
          <li className="profile__avatar__container" onClick={() => navigate("/myaccount")}>
             <div className="profile__avatar">
             <i class="fas fa-sign-in-alt"></i>
               <h4>{userDetails.name}!</h4>
             </div>
          </li>
          }

         { isUserloggedIn &&
          <li>
            <NavLink to="/wishlist" className="nav-link">
               <i className="fa fa-heart">
                {/* <span className="badge">{wishlist.length}</span> */}
               </i>
               <span className="icon-name">Wishlist({wishlist.length})</span>
            </NavLink>
          </li>
          }

          { isUserloggedIn &&
            <li>
            <NavLink to="/cart" className="nav-link">
            <i className="fa fa-shopping-cart">
              {/* <span className="badge">{totalCartItem}</span> */}
            </i>
            <span className="icon-name">Cart({totalCartItem})</span>
            </NavLink>
          </li>}

          { !isUserloggedIn && 
          <li className="loginBtn">
            <NavLink to="/login" className="nav-link">
              <i className="fa fa-user"></i>
              <span className="icon-name">Login/Signup</span>
            </NavLink>
          </li>}
        </ul>
      </nav>
    )
}