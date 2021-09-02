import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import { OrderCard } from "./OrderCard";
import { BtnSpinner } from "../../utils/BtnSpinner";
import { API } from "../../constants"

export function Orders () {
    const { uid } = useAuth();
    const [orders, setOrders] = useState([]);
    const [spinner, setSpinner] = useState(false);

    useEffect(() => {
        ( async function() {
            setSpinner(true);
            try {
                const res = await axios.get(`${API}/api/orders/${uid}`);
                setOrders(res.data?.orders)
                setSpinner(false)
            } catch(error) {
                setOrders(null);
                setSpinner(false)
            }
        } )()
    }, [uid]);

    return (
        <div className="yourorders__container">
            <h1 className="yourorders__container__heading">My Orders</h1>
            <BtnSpinner show={spinner}/>
            
             { orders ? orders.map( order => (
                 <OrderCard key={order._id} order={order}/>
             )).reverse() : <p>No orders found</p>}
             
        </div>
    );
}