import { useState } from "react";
import { useAddress } from "../../contexts/AddressContext";

export const EditAddress = (props) => {

  const { editAddress } = useAddress();
  
  const [addresses, setAddresses] = useState({
    _id: props._id,
    addressID: props.addressID,
    name: props.name,
    type: props.type,
    number: props.number,
    address: props.address,
    locality: props.locality,
    city: props.city,
    state: props.state,
    pincode: props.pincode
  });

  const [ errors,setErrors ] = useState({
    name: "",
    type: "",
    number: "",
    address: "",
    locality: "",
    city: "",
    state: "",
    pincode: ""
  });

  const { name,type,number,address,locality,city,state,pincode } = addresses;

  const formValidate = (newaddress) => {

    let name,type,number,address,locality,city,state,pincode;

    if( newaddress.name === "" ){
      name="please fill this field"
    }
    if( newaddress.type === "" ){
      type="please fill this field"
    }
    if( !/^[6789]\d{9}$/.test(newaddress.number) ){
      number="Invalid number"
    }
    if( newaddress.address === "" ){
      address="please fill this field"
    }
    if( newaddress.locality === "" ){
      locality="please fill this field"
    }
    if( newaddress.city === "" ){
      city="please fill this field"
    }
    if( newaddress.state === "" ){
      state="please fill this field"
    }
    if( newaddress.pincode === "" ){
      pincode="please fill this field"
    }
    
    setErrors({ name,type,number,address,locality,city,state,pincode });
    if( !name && !type && !number && !address && !locality && !city && !state && !pincode ){
      return true;
    }
  }

  const handleChange = (e) => {
    const { value, name } = e.target;
    setAddresses((address) => ({ ...address, [name]: value }));
  };
  
  return (
    <div className="editAddress">
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
        <input type="radio" checked={type === "Home"} value="Home" name="type" onChange={handleChange} />
        Home
        <input type="radio" checked={type === "Office"} value="Office" name="type" onChange={handleChange} />
        Office
        <br />
        <span className="invalid-feedback">{errors.type}</span>
          <br />
          <button
            onClick={() => {
              if( formValidate(addresses) ){
                editAddress(addresses,props.loader)
                props.edit(false)
              }
            }}
            className="primary-btn"
          >
            <i className="fa fa-edit"></i> Edit Address
          </button>
          <button onClick={() => props.edit(false)} className="secondary-btn">
            Cancel
          </button>
          
        </div>
  )
}