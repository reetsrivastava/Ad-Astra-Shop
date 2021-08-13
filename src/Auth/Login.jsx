import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {useNavigate} from 'react-router-dom';
import {Spinner} from '../utils/Spinner';
import {useAuth} from '../contexts/AuthContext';

import axios from 'axios';
import { API } from "../constants";

export const Login = () => {

  useEffect(() => {
    window.scroll({ behavior:'smooth',top:0 });
  },[])

    const [state,setState] = useState({email:"",password:""});
    const [errors,setErrors] = useState({email:"",password:""});
    const [spinner,setSpinner] = useState(false);
    const [showPassword,setShowPassword] = useState(false);

    const navigate = useNavigate();
    const path = useLocation().state;

    const { dispatch } = useAuth();

    const handleChange = (e) => {
       const {value,name} = e.target;
       setState( state => ({...state,[name]:value}) )
    }

    const formValidate = (state) => {
       let email,password;

       if(!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(state.email)){
         email="Please enter a valid email address"
       }

       if(!/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/.test(state.password)){
        password="minimum length of password will be 8, at least 1 lowercase letter and 1 number"
       }

       setErrors({email,password})

       if(!email && !password){
         return true;
       }
    }

    async function login(state){
      try {
        const { status,data } = await axios.post(`${API}/api/users/login`,state);
        
         if( status === 200 ){
           localStorage.setItem('authToken',JSON.stringify({...data}));

           dispatch({ type:"LOGIN",payload:data })
           navigate(path === null ? "/" : path.from)
         }
         setSpinner(false)

      } catch (error) {
        setSpinner(false)
         const { status, data } = error.response;

         if(status === 401){
           setErrors(state => ({...state,password:data.message}))
         }
         else if(status === 404){
           setErrors(state => ({...state,email:data.message}))
         }
      }
    }

    const handleSubmit = async(e) => {
       e.preventDefault();

       if(formValidate(state)){
          setSpinner(true)
          login(state)
       }
    }

    const handleLoginAsGuest = () => {
         setSpinner(true)
         login({email:"baby@gmail.com",password:"Baby@1234"})
    }
  
    return (
      <div>
        <Spinner show={spinner}/>

      <div className="login__container">
        <form onSubmit={handleSubmit}>
            <h1 className="form__heading">LOGIN</h1>
            <div className="form__group">
              <label className="form__label" htmlFor="email">Email : </label>
              <div>
                <input className="form__control" value={state.email} onChange={handleChange} type="email" name="email"/>
                <span className="invalid-feedback">{errors.email}</span>
              </div>
            </div>

            <div className="form__group">
              <label className="form__label" htmlFor="password">Password : </label>
              <div className="form__input__container">
              <div onClick={() => setShowPassword(state => !state)}>
                { showPassword ? <i className="fa fa-eye"></i> : <i className="fa fa-eye-slash"></i> }
              </div>
              <input className="form__control" value={state.password} onChange={handleChange} type={!showPassword ? "password" : "text"} name="password"/>
              <span className="invalid-feedback">{errors.password}</span>
            </div>
            </div>

            <input type="submit" className="primary-btn" value="LOGIN"/>
            
        </form>

        {/* <p className="forget__password"><Link to="/resetpassword" className="forget__password__link"><u>Forget password?</u></Link></p> */}
        <br/>
        <small>Don't have an account? <Link to="/signup" className="signup__link"><u>SIGN UP</u></Link></small>
        <div>
            <div className="separator">
                 <div className="separator__line"></div>
                 <div className="separator__text">OR</div>
                 <div className="separator__line"></div>
            </div>
//             <button onClick={handleLoginAsGuest} style={{display:"block",width:"100%"}} className="primary-btn">Login as guest</button>
        </div>
      </div>
   </div>
    );
};
