import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContex } from '../../Context/StoreContex';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Navbar({ setshowlogin }) {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount, token, settoken } = useContext(StoreContex);
  const navigate = useNavigate();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const Logout = () => {
    localStorage.removeItem("token");
    settoken("");
    navigate("/");
    toast.success("Logged out successfully!")
    toast.success("See you soon!")

  }


  
    const handleLogoClick = (e) => {
      e.preventDefault(); // Prevent the default link behavior
      window.location.href = 'https://orderup-frontend.onrender.com/'; // Navigate to the URL, which will cause the page to reload
    };

  return (
    <div className="navbar">
      <Link to='/'><img src={assets.logo} onClick={handleLogoClick} alt="Logo" width="100" height="50" /></Link>
      <ul className="navbar-menu">
        <li>
          <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>Home</Link>
        </li>
        <li>
          <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>Menu</a>
        </li>

        <li>
          <a href='#TopDisForYoou' onClick={() => setMenu("about")} className={menu === "about" ? "active" : ""}>Dis For Yoou</a>
        </li>

        <li>
          <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>Mobile App</a>
        </li>
        
        {/* <li>
          <a href='#footer' onClick={() => setMenu("contact")} className={menu === "contact" ? "active" : ""}>Contact</a>
        </li> */}
      </ul>
      <div className="navbar-right">
       {/* <Link to='/Promo_Code'  ><img className='offer'  src={assets.offer_icon} alt="offer_icon" width="30" height="30" /></Link> */}
        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="Basket Icon" width="30" height="30" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>
        {!token ? (
          <button onClick={() => setshowlogin(true)}>Sign in</button>
        ) : (
          <div className='navbar-profile' onClick={() => setShowProfileDropdown(!showProfileDropdown)}>
            <img src={assets.profile} alt="Profile Icon" width="30" />
            {showProfileDropdown && (
              <ul className="nav-profile-drop-down">
                <li onClick={() => navigate("/profile")}><img src={assets.account} alt='' /><p>My Profile</p></li>
                <hr />
      
                <li onClick={() => navigate("/myorders")}><img src={assets.bag} alt='' /><p>My Order</p></li>
                <hr />
                <li onClick={Logout}><img src={assets.logout} alt='' /><p>LogOut</p></li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
