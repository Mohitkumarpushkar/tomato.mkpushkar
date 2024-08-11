import React, { useContext,useState, useEffect } from 'react'
import {useNavigate} from 'react-router-dom'
import './PlaceOrder.css'
import axios from 'axios';

import { StoreContext } from '../../components/Context/StoreContext';
function PlaceOrder() {
  const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext)
    
  const [data,setData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipCode:"",
    country:"",
    phone:""

  })
 

  const onchangeHandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const placeOrder=async(event)=>{
    event.preventDefault();
    let orderItem=[];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo=item;
        itemInfo["quantity"]=cartItems[item._id];
        orderItem.push(itemInfo);
      }
    })
    let orderData={
      address:data,
      items:orderItem,
      amount:getTotalCartAmount()+2,
      
      
      
    }
   
   
    let response=await axios.post(url+"/api/order/place",orderData,{headers:{token}});
   
   
   if(response.data.success){
    const {session_url}=response.data;
    window.location.replace(session_url);

   }
   else{
    alert(`Error: ${response.data.message}`);
   }

  }

  // show order details when user login only
  const navigate=useNavigate();
  useEffect(()=>{
    if(!token){
      navigate('/cart')

    }
    else if(getTotalCartAmount()===0){
      navigate('/cart')

    }

  },[token])
    return (
      <form onSubmit={placeOrder} action="" className="place-order">
   
         <div className='place-order-left'>
           <p className='title'>Delivery Information</p>
           <div className='multi-fields'>
             <input required name='firstName'onChange={onchangeHandler} value={data.firstName} type="text" placeholder='First Name' />
             <input required name='lastName'onChange={onchangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
            
           </div>
           <input required name='email'onChange={onchangeHandler} value={data.email} type="email" placeholder='Email Address' />
             <input required name='street'onChange={onchangeHandler} value={data.street} type="text" placeholder='street' />
             <div className='multi-fields'>
             <input required name='city'onChange={onchangeHandler} value={data.city} type="text" placeholder='city' />
             <input required name='state'onChange={onchangeHandler} value={data.state} type="text" placeholder='state' />
            
           </div>
           <div className='multi-fields'>
             <input required name='zipCode'onChange={onchangeHandler} value={data.zipCode} type="text" placeholder='ZipCode' />
             <input required name='country'onChange={onchangeHandler} value={data.country} type="text" placeholder='Country' />
            
           </div>
           <input required name='phone'onChange={onchangeHandler} value={data.phone} type="text" placeholder="Phone Number"/>
   
           
   
   
         </div>
         <div className='place-order-right'>
         <div className='cart-total'>
             <h2>Cart Total</h2>
             <div>
               <div className='cart-total-details'>
                 <p>Subtotal</p>
                 <p>${getTotalCartAmount()}</p>
               </div>
               <hr />
               <div className='cart-total-details'>
                 <p>Delivery Fee</p>
                 <p>${getTotalCartAmount()===0?0:2}</p>
               </div>
               <hr />
               <div className='cart-total-details'>
                 <b>Total</b>
                 <b>${getTotalCartAmount()===0?0: getTotalCartAmount()+2}</b>
               </div>
               
             </div>
             <button type='submit' className='checkout'>Proceed To Payment</button>
           </div>
           
   
         </div>
   
      </form>
     )
   
  }
  


export default PlaceOrder
