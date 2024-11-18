import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Cart from './Pages/Cart/Cart'
import PlaceOrde from './Pages/PlacedOrder/PlaceOrde'
import Footer from './Components/Footer/Footer'
import LoginPopup from './Components/LoginPopUp/LoginPopup'
import Verify from './Pages/Verify/Verify'
import Myorder from './Pages/Myorder/Myorder'
import Promocode from './Pages/promocode/promocode'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Profile from './Pages/Profile/Profile'
import ProductDetail from './Components/ProductDetail/ProductDetail'


function App() {

  const [showlogin,setshowlogin]=useState(false)
  return (
<>

<ToastContainer />
{showlogin?<LoginPopup setshowlogin={setshowlogin}/>:<></>}
<div className='app'>

      <Navbar setshowlogin={setshowlogin}/>

      <Routes>

          <Route path='/' element={<Home/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/order' element={<PlaceOrde/>}/>
          <Route path='/verify' element={<Verify/>}/>
          <Route path='/myorders' element={<Myorder/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/Promo_Code' element={<Promocode/>}/>
          <Route path="/food/:id" element={<ProductDetail/>} />
      </Routes>
      
    </div>
    <Footer/>

</>
  )
}

export default App
