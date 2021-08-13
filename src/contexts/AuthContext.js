import React,{ createContext,useContext, useEffect, useReducer } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {


    const userReducer = (state, action) => {
        switch (action.type) {
            case "LOGIN":
            return {...action.payload}
            case "SIGNOUT":
            return {token:"",login:false ,name:"",uid:"",email:""}
            default:
            return state;
        }
    }
    
    const [{token,login,name,uid,email},dispatch] = useReducer(userReducer,JSON.parse(localStorage?.getItem('authToken'))||{ token:"",login:false ,name:"",uid:"",email:"" })

    useEffect(() => {
        if(!login){
            return;
        }
       
        (async function(){
           try {
            await axios.post("https://astraShop.reetrs.repl.co/api/users/protected",{},{ headers:{
                "Authorization": `Bearer ${token}`
            }});
          
           } catch (error) {
               dispatch({ type:"SIGNOUT"})
           }
        }())
     },[login,token])

    async function signout(spinner,sidebar){
        spinner(true)
        if(sidebar){
            sidebar()
        }
        try {
            const {status} = await axios.post("https://shopping-hub-2021.herokuapp.com/api/users/signout")
            if(status === 200){
                localStorage?.removeItem('authToken');
                dispatch({type:"SIGNOUT"});
                spinner(false)
            }
        } catch (error) {
            spinner(false)
        }
    }

    return (
        <AuthContext.Provider value={{isUserloggedIn:login,token,uid,name,email,dispatch,signout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);