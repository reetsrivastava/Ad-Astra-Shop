import {useState} from 'react';

import { Link } from 'react-router-dom';

import Spinner from '../utils/Spinner';
import SuccessToast from '../utils/SuccessToast';

// import axios from 'axios';

export const ForgetPassword = () => {
    const [state,setState] = useState({email:"",otp:null,password:"",confirmPassword:""});
    const [errors,setErrors] = useState({email:"",otp:"",password:"",confirmPassword:""});

    const [isEmail,setIsEmail] = useState(false);
    const [isOtp,setIsOtp] = useState(false);

    const [spinner,setSpinner] = useState(false);
    const [toast,setToast] = useState("");
    const [showPassword,setShowPassword] = useState(false);

    const handleChange = (e) => {
       const {value,name} = e.target;
       setState( state => ({...state,[name]:value}) )
    }


    const formValidate = (state) => {
        let password,confirmPassword;
 
        if(!/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/.test(state.password)){
         password="minimum length of password will be 8, at least 1 lowercase letter and 1 number"
        }

        if(!/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/.test(state.confirmPassword)){
            confirmPassword="minimum length of password will be 8, at least 1 lowercase letter and 1 number"
        }
 
        setErrors({password,confirmPassword})
 
        if(!confirmPassword && !password){
          return true;
        }
     }

    const handleSubmit = async(e) => {
       e.preventDefault();
       if( !isEmail ){
           // logic code
           setIsEmail(true)
           return;
       }
       if(!isOtp){
           // logic code
           setIsOtp(true)
           return;
       }
    //    if(formValidate(state)){
    //     console.log(state);
    //    }
        //  setSpinner(true)
        //   try {
            
        //     setSpinner(false)
        //   } catch (error) {
        //     setSpinner(false)

             
        //   }
    }

    return (
      <div className="login__container">
        {/* <Spinner show={spinner}/> */}
        {/* <SuccessToast show={toast} background="#181818" color="#dab600"/> */}

      <form onSubmit={handleSubmit}>
          <h1 className="form__heading">RESET PASSWORD</h1>

          <div className="form__group">
            <label className="form__label" htmlFor="email">Email : </label>
            <div>
              <input className="form__control" disabled={isEmail ? true : false} value={state.email} onChange={handleChange} type="email" name="email"/>
              <span className="invalid-feedback">{errors.email}</span>
            </div>
          </div>

          { isEmail && !isOtp &&
          <div className="form__group">
            <label className="form__label" htmlFor="otp">Enter OTP : </label>
            <div className="form__input__container">
              <input className="form__control" value={state.otp} onChange={handleChange} type="number" name="otp"/>
              <span className="invalid-feedback">{errors.otp}</span>
            </div>
          </div>
          }

          { isOtp && <div className="form__group">
            <label className="form__label" htmlFor="password">New password : </label>
            <div className="form__input__container">
              <div onClick={() => setShowPassword(state => !state)}>
                { showPassword ? <i className="fa fa-eye"></i> : <i className="fa fa-eye-slash"></i> }
              </div>
              <input className="form__control" value={state.password} onChange={handleChange} type={!showPassword ? "password" : "text"} name="password"/>
              <span className="invalid-feedback">{errors.password}</span>
            </div>
          </div>
          }
          
          { isOtp && <div className="form__group">
            <label className="form__label" htmlFor="confirmPassword">Confirm new password : </label>
            <div className="form__input__container">
              <div onClick={() => setShowPassword(state => !state)}>
                { showPassword ? <i className="fa fa-eye"></i> : <i className="fa fa-eye-slash"></i> }
              </div>
              <input className="form__control" value={state.confirmPassword} onChange={handleChange} type={!showPassword ? "password" : "text"} name="confirmPassword"/>
              <span className="invalid-feedback">{errors.confirmPassword}</span>
            </div>
          </div>}

          <input type="submit" className="secondary-btn" value={ isOtp ? "RESET" : "SUBMIT"}/>
      </form>

      <div className="backLink">
        <Link to="/login"><i className="fa fa-left-arrow"></i> Go Back</Link>
      </div>

    </div>
    );
};
