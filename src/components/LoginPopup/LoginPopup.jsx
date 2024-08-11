import React, { useContext, useState } from 'react'
import './LoginPopup.css'
import axios from 'axios';
import { assets } from '../../assets/assets'
import { StoreContext } from '../Context/StoreContext'
const LoginPopup = ({setShowLogin}) => {

     const {url,setToken}=useContext(StoreContext);
    const[currState,setCurrState]=useState("Sign Up")

    const [data,setData]=useState({
      name:"",
      email:"",
      password:"",
     

    })

    const onchangeHandler=(event)=>{
      const name=event.target.name;
      const value=event.target.value;
      setData(data=>({...data,[name]:value}))
    }

    const onLogin=async(event)=>{
      event.preventDefault();
      let newUrl=url;
      if(currState==="Login"){
        newUrl+="/api/user/login"

      }
      else{
        newUrl+="/api/user/register"
      }

      const response = await axios.post(newUrl,data);
      console.log("Response:", response.data);
      if(response.data.success){
        setToken(response.data.token);
        localStorage.setItem("token",response.data.token);
        setShowLogin(false);

      }
      else{
        alert(response.data.message);
      }

    }
   
     

  return (
    <div className='login-popup'>
        <form onSubmit={onLogin} className='login-popup-container'>
            <div className='login-popup-title'>
            <h2>{currState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt=''/>
            </div>
            <div className='login-popup-inputs'>
              {currState==="Login"?<></>: <input name='name' onChange={onchangeHandler} value={data.name} type='text' placeholder=' Your Name' required/>}
               
                <input name='email' onChange={onchangeHandler} value={data.email} type='email' placeholder='Email' required/>
                <input name='password' onChange={onchangeHandler} value={data.password} type='password' placeholder='Password' required autoComplete='password'/>

            </div>
            <button type='submit'>{currState==="Sign Up" ?"Create account":"Login"}</button>
            <div className='login-popup-condition'>
              <input type='checkbox' required/>
              <p>By continuing,i agree to term of use & privacy policy</p>
            </div>
            {currState==="Login"? <p>
              create a new accout <span onClick={()=>setCurrState("Sign Up")}>click here</span> </p>:
               <p>Already have an account?<span onClick={()=>setCurrState("Login")}>Login here</span></p>}
           
             
            


        </form>
      
    </div>
  )
}

export default LoginPopup
