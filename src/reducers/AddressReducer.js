import {useEffect, useReducer} from "react";
import {useAuth} from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import axios from 'axios';
import { API } from "../constants";

export const AddressReducer = () => {

    const { uid,isUserloggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect( () => {
        if(!isUserloggedIn){
           return;
        }
        ( async function(){
          try {
            const res = await axios.get(`${API}/api/addresses/${uid}`);
            dispatch({ type:"INITIAL_STATE",payload:{address:res?.data?.addresses,selectedAddress:res?.data?.selectedAddress}})
          } catch (error) {
            return dispatch({ type:"INITIAL_STATE",payload:{address:[],selectedAddress:""}})
          }
        } )()
      },[uid,isUserloggedIn] )

      const addressReducer = (state,action) => {

        switch(action.type) {
            case "INITIAL_STATE":
            return action.payload
            case "UPDATE_ADDRESSES":
            return {...state,address:action.payload}
            case "SELECTED_ADDRESS":
            return {...state,selectedAddress:action.payload}
            default:
            return state;
        }
    }

    const [{address,selectedAddress},dispatch] = useReducer(addressReducer,{address:[],selectedAddress:""});

    const addAddress = async(address,loader,path) => {
        loader(true)
        try {
            const {data,status} = await axios.post(`${API}/api/addresses/${uid}`,address);
            if(status === 200){
                dispatch({ type:"UPDATE_ADDRESSES",payload:data.addresses.addresses});
                loader(false);
                navigate("/address",{state:{from:path}});
            }
        } catch (error) {
            loader(false)
        }
    }

    const removeAddress = async(_id,loader) => {
        loader(true)
        try {
           const {data,status} = await axios.delete(`${API}/api/addresses/${uid}/${_id}`);
           if(status === 200){
                dispatch({ type:"UPDATE_ADDRESSES",payload:data.addresses.addresses});
                loader(false)
            }
        } catch (error) {
            loader(false)
            alert("something went wrong with server");
        }
    }

    const editAddress = async(address,loader) => {
        loader(true)
        try {
            const {data,status} = await axios.post(`${API}/api/addresses/${uid}/${address._id}`,address);
            if(status === 200){
                dispatch({ type:"UPDATE_ADDRESSES",payload:data.addresses.addresses});
                loader(false)
            }
        } catch (error) {
            loader(false)
            alert("something went wrong with server");
        }
    }

    const setSelectedAddress = async(_id,loader) => {
        loader(true)
        try {
            const {data,status} = await axios.post(`${API}/api/addresses/${uid}/${_id}/setaddress`);
            console.log(data.selectedAddress);
            if(status === 200){
                dispatch({ type:"SELECTED_ADDRESS",payload:data.selectedAddress});
                loader(false)
            }
        } catch (error) {
            loader(false)
            alert("something went wrong with server");
        }
    }
    
    return {address,dispatch,selectedAddress,setSelectedAddress,addAddress,removeAddress,editAddress}
};