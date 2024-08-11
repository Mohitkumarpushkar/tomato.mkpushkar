import React, { useContext ,useState,useEffect} from 'react'
import './MyOrders.css'
import axios from 'axios'
import { StoreContext } from '../../components/Context/StoreContext';
import { assets } from '../../assets/assets'

const MyOrders = () => {
     const {url,token}=useContext(StoreContext)
    const [data,setData]=useState([]);
    const fetchOrders=async()=>{
        const response=await axios.post(url+"/api/order/userorders",{},{headers:{token}});
        setData(response.data.data);
       
    }
    useEffect(()=>{
       if(token){
        fetchOrders();
       }
    },[token])
  return (
    <div className='my-orders'>
<h2>My Orders</h2>
<div className='container'>
    {
        data.length>0?
        data.map((order,index)=>(
            <div key={index} className='my-orders-order'>
                <img src={assets.parcel_icon} alt=''/>
                <p>{order.items.map((item,index)=>{
                    if(index===order.items.length-1){
                        return item.name+" X "+item.quantity
                    }
                    else{
                        return item.name+" X "+item.quantity+","
                    }

                })}</p>
                <p>${order.amount}.00</p>
                <p>Items:{order.items.length}</p>
                <p><span>&#x25cf;</span><b>{order.status}</b></p>
                <button onClick={fetchOrders} className='track-order'> track Order</button>
            </div>
        ))
        :
        <h3>No Orders Found</h3>
    }

</div>
    </div>
  )
}

export default MyOrders
