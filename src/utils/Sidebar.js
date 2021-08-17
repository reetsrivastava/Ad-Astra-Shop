import React,{useState} from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../contexts/AuthContext';
import {Backdrop} from './Backdrop';
import {Spinner} from './Spinner';

export const Sidebar = ({className,setShowSidebar}) => {
    const { isUserloggedIn,signout } = useAuth();

    const closeSidebar = () => setShowSidebar(false);
    const [spinner,setSpinner] = useState(false); 
    const [showBackdrop,setShowBackdrop] = useState(false); 

  return (
    <div>
           <Spinner show={spinner}/>
            <Backdrop show={showBackdrop} onClick={() => setShowBackdrop(false)}/>
            <div className={`sidebar ${className}`} >
            
         <i className="fas fa-window-close closeBtn" onClick={closeSidebar}></i>

         <section className="sidebar__header">
           <h3>AstraShop</h3>
         </section>

         <section className="profile__pic">
           <Link to="/myaccount" onClick={closeSidebar} className="avatar-link">
             <span className="avatar">Profile</span>
           </Link>
          {  isUserloggedIn ? <p style={{margin:'0.5rem 0'}}></p> : <p style={{margin:'0.5rem 0'}}>Login/Signup</p> }
         </section>

         <section className="sidebar__links__section">
           <Link className="sidebar__link" to="/" onClick={closeSidebar}><i className="fa fa-home"></i>&nbsp;&nbsp;Home</Link>
           { isUserloggedIn && <> 
           
           <Link className="sidebar__link" to="/address" onClick={closeSidebar}><i className="fas fa-address-card"></i>&nbsp;&nbsp;Your Address</Link>
           <div className="sidebar__link" onClick={()=>signout(setSpinner,closeSidebar)}>
           <i className="fa fa-sign-out"></i>&nbsp;&nbsp;signout  
            </div> </>}
         </section>
      </div>
    </div>
       
  )
}