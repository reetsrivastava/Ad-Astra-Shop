import {useEffect, useState} from 'react';

import { Link } from 'react-router-dom';

import {Spinner} from '../utils/Spinner';
import {Toast} from '../utils/Toast';

import axios from 'axios';
import { API } from '../constants';

export const SignUp = () => {
   useEffect(() => {
     window.scroll({ behavior:'smooth',top:0 });
   },[])

    const [state,setState] = useState({email:"",password:"",name:""});
    const [errors,setErrors] = useState({email:"",password:"",name:""});
    const [spinner,setSpinner] = useState(false);
    const [toast,setToast] = useState(false);
    const [showPassword,setShowPassword] = useState(false);

    const handleChange = (e) => {
       const {value,name} = e.target;
       setState( state => ({...state,[name]:value}) )
    }

    const formValidate = (state) => {
       let name,email,password;

       if(state.name === ""){
         name = "Please fill this field"
       }

       if(!/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(state.email)){
         email="Please enter a valid email address"
       }

       if(!/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/.test(state.password)){
        password="minimum length of password will be 8, at least 1 lowercase letter and 1 number"
       }

       setErrors({name,email,password})

       if(!name && !email && !password){
         return true;
       }
    }

    const handleSubmit = async(e) => {
       e.preventDefault();
       if(formValidate(state)){
         setSpinner(true)
          try {
            const {data,status} = await axios.post(`${API}/api/users/signup`,state);

            if(status === 200){
              setToast(data.message);

              setTimeout( () => {
                setToast("");
              },2000) 

              setState({name:"",email:"",password:""})
            }

            setSpinner(false)
          } catch (error) {
            setSpinner(false)

             const { status,data } = error.response;

             if(status === 409){
               setErrors( state => ({...state,email:data.message}) )
             }

          }
       }
    }

    return (
     <div>
       <Spinner show={spinner}/>
        <Toast show={toast} message={toast} className="toast__content" background="var(--secondary)" color="var(--primary)"/>
      <div className="login__container">

      <form onSubmit={handleSubmit}>
          <h1 className="form__heading">SIGN UP</h1>
          <div className="form__group">
            <label className="form__label" htmlFor="name">Name : </label>
            <div>
              <input className="form__control" value={state.name} onChange={handleChange} type="text" name="name"/>
              <span className="invalid-feedback">{errors.name}</span>
            </div>
          </div>
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

          <input type="submit" className="secondary-btn" value="SIGNUP"/>
      </form>
      <br/>
      <small>Already have an account? <Link to="/login" className="signup__link">LOGIN</Link></small>
    </div>
   </div> 
    );
};
