import { useState } from "react";

import { useAddress } from "../../contexts/AddressContext";
import { useLocation, useNavigate } from "react-router-dom";
import {Spinner} from "../../utils/Spinner";


export const AddNewAddress = () => {
  const { addAddress } = useAddress();
  const navigate = useNavigate();

  const [spinner,setSpinner] = useState(false);
  const path = useLocation()?.state?.from;

  const [newAddress, setNewAddress] = useState({
    name: "",
    type: "",
    number: "",
    address: "",
    locality: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    type: "",
    number: "",
    address: "",
    locality: "",
    city: "",
    state: "",
    pincode: "",
  });

  const { name, number, address, locality, city, state, pincode } = newAddress;

  const formValidate = (newAddress) => {
    let name, type, number, address, locality, city, state, pincode;

    if (newAddress.name === "") {
      name = "please fill this field";
    }
    if (newAddress.type === "") {
      type = "please fill this field";
    }
    if (!/^[6789]\d{9}$/.test(newAddress.number)) {
      number = "Invalid mobile number";
    }
    if (newAddress.address === "") {
      address = "please fill this field";
    }
    if (newAddress.locality === "") {
      locality = "please fill this field";
    }
    if (newAddress.city === "") {
      city = "please fill this field";
    }
    if (newAddress.state === "") {
      state = "please fill this field";
    }
    if (newAddress.pincode === "") {
      pincode = "please fill this field";
    }

    setErrors({ name, type, number, address, locality, city, state, pincode });

    if (
      !name &&
      !type &&
      !number &&
      !address &&
      !locality &&
      !city &&
      !state &&
      !pincode
    ) {
      return true;
    }
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
  };

  return (
    <div className="newAddress">
      <Spinner show={spinner}/>
      <h2>Add a new address</h2>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name :</label>
          <div>
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter your name.."
              value={name}
              onChange={handleChange}
            />
            <span className="invalid-feedback">{errors.name}</span>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="number">Mobile Number :</label>
          <div>
            <input
              type="number"
              name="number"
              className="form-control"
              placeholder="mobile number.."
              value={number}
              onChange={handleChange}
            />
            <span className="invalid-feedback">{errors.number}</span>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="pincode">Pincode :</label>
          <div>
            <input
              type="number"
              name="pincode"
              className="form-control"
              placeholder="pincode.."
              value={pincode}
              onChange={handleChange}
            />
            <span className="invalid-feedback">{errors.pincode}</span>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="locality">Locality :</label>
          <div>
            <input
              type="text"
              name="locality"
              className="form-control"
              placeholder="locality.."
              value={locality}
              onChange={handleChange}
            />
            <span className="invalid-feedback">{errors.locality}</span>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="address">Address :</label>
          <div>
            <textarea
              name="address"
              className="form-control"
              placeholder="Enter address"
              value={address}
              onChange={handleChange}
            />
            <span className="invalid-feedback">{errors.address}</span>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="city">City :</label>
          <div>
            <input
              type="text"
              name="city"
              className="form-control"
              placeholder="City/District/Town"
              value={city}
              onChange={handleChange}
            />
            <span className="invalid-feedback">{errors.city}</span>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="state">State :</label>
          <div>
            <input
              type="text"
              name="state"
              className="form-control"
              placeholder="State..."
              value={state}
              onChange={handleChange}
            />
            <span className="invalid-feedback">{errors.state}</span>
          </div>
        </div>
        <label htmlFor="type">
          <strong>Address type :</strong>
        </label>
        <input type="radio" value="Home" name="type" onChange={handleChange} />
        Home
        <input
          type="radio"
          value="Office"
          name="type"
          onChange={handleChange}
        />
        Office
        &nbsp; <span className="invalid-feedback">{errors.type}</span>

        <br />
        <button
          onClick={(e) => {
            e.preventDefault();
            if (formValidate(newAddress)) {
              addAddress(newAddress,setSpinner,path);
            }
          }}
          className="primary-btn"
        >
          Save Address
        </button>
        <button onClick={() => navigate("/address",{state:{from:path}})} className="secondary-btn">
          Cancel
        </button>
      </form>
    </div>
  );
};