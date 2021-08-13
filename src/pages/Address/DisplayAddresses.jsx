import {AddressContent} from "./AddressContent";
import { useAddress } from "../../contexts/AddressContext";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const DisplayAddresses = () => {

  useEffect(() => {
    window.scroll({ behavior:'smooth',top:0 });
  })

  const { address } = useAddress();
  const navigate = useNavigate();
  const path = useLocation()?.state?.from;

  return (
    <div className="address_container">
      <h3>Choose Delivery Address</h3>
      {
        address?.map((displayAddress) => (
          <AddressContent key={displayAddress._id} {...displayAddress}/>
        ))
      }
      <br />
      <button className="primary-btn" onClick={() => navigate("/newaddress",{state:{from:path}})}>
        Add a new Address
      </button>

    </div>
  );
};