import React, { useState } from 'react'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'
import { Route,Routes } from 'react-router-dom'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Cart from'./pages/Cart/Cart'
import Home from './pages/Home/Home'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Verify from './pages/verify/Verify'
import MyOrders from './pages/myOrders/MyOrders.jsx'

const App = () => {
  const [showLogin,setShowLogin] =useState(false)
  return (
    <>
    {showLogin ?(<LoginPopup setShowLogin={setShowLogin}/>):<></>}
     <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/order' element={<PlaceOrder />} />
        <Route path='/verify' element={<Verify/>} />  
       
        <Route path='/cart' element={<Cart />} />
        <Route path='/myorders' element={<MyOrders />} />
      </Routes>
      
    </div>
    <Footer/>
    </>
   
  )
}

export default App
