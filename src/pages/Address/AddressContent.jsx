import { useState } from "react";
import { useAddress } from "../../contexts/AddressContext";
import { useCart } from "../../contexts/CartContext";
import {EditAddress} from "./EditAddress";
import { useLocation, useNavigate } from "react-router-dom";
import {Spinner} from "../../utils/Spinner";


export const AddressContent = (props) => {

  const { _id,name, type, number, pincode, city, state, address, locality } = props;
  const [edit, setEdit] = useState(false);
  const { setSelectedAddress,removeAddress,selectedAddress } = useAddress();
  const {cart} = useCart();
  const navigate = useNavigate();

  const path = useLocation()?.state?.from;

  const [spinner,setSpinner] = useState(false);
 
  const HandleAddressSelection = (e) => {
    setSelectedAddress(e.target.id,setSpinner)
  }

  return (
    <div className="addresses_container">
      <Spinner show={spinner}/>
      {!edit ? (
        <>
          <input id={_id} name="address" checked={ selectedAddress && selectedAddress._id === _id} type="radio" onChange={HandleAddressSelection} />
          <div className="addresses">
            <span className="address_type">{type}</span>
            <div>
              <span className="name"> {name}</span>
              <span className="number"> &nbsp;{number} </span>
              <div className="removeIcon">
                <button title="remove" onClick={() => removeAddress(_id,setSpinner)} >
                  <i style={{ color:'rgb(223, 71, 89)' }} className="fa fa-trash" aria-hidden="true"></i>
                </button>
              </div>
              <button
                onClick={() => setEdit(!edit)}
                className="secondary-btn"
              >
              <i className="fa fa-edit"></i> EDIT
              </button>
            </div>
            <p>
              {address} , {locality} , {city} , {state} ,
              <strong> {pincode}</strong>
            </p>
            { path === "cart" && _id === selectedAddress._id  && 
            <button style={{width:"fit-content"}} className="secondary-btn" 
            onClick={ () => cart.length > 0 ? navigate("/ordersummary",{state:{from:"address"}}) : navigate("/cart") }>Deliver to this address</button>}
          </div>
        </>
      ) : (
        <EditAddress {...props} edit={setEdit} loader={setSpinner}/>
      )}
    </div>
  );
};