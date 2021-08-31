import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

export function LandingPage() {
    const { isUserloggedIn } = useAuth();

    return (
        <div className="landing_page_container">
            <span className="sidebar__link home_link">Shop The World Technical Apparatus from Ad Astra - Your Local Space Shop</span>
            <span className="home_btn_container">
                <Link to="/products" className="sidebar__link">
                   <span className="home_link"> Shop Now</span>
                </Link>
                { isUserloggedIn ? <Link to="/cart" className="sidebar__link">
                   <span className="home_link">My Cart</span>
                </Link> : <Link to="/login" className="sidebar__link">
                   <span className="home_link">Login Now</span>
                </Link> }
                
            </span>
        </div>
    )
}