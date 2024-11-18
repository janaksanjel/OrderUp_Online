import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { assest } from "../../assets/assest";

function Navbar() {
  const navigate = useNavigate();
  const subAdminName = localStorage.getItem("subAdminName"); // Retrieve admin's name from local storage

  const handleLogout = () => {
    // Clear the subAdminId and name from local storage
    localStorage.removeItem("subAdminId");
    localStorage.removeItem("subAdminName");

    // Redirect to the login page
    navigate("/");
  };

  return (
    <div className="navbar">
      <img className="logo" src={assest.logo} alt="Logo" />
      {subAdminName ? (
        <div className="navbar-right">
          <img className="profile" src={assest.profile} alt="" />
          <p className="admin-greeting">Hi, {subAdminName}</p>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : null}{" "}
      {/* Show nothing if not logged in */}
    </div>
  );
}

export default Navbar;
