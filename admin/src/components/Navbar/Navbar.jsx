import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { assest } from "../../assets/assest";

function Navbar() {
  const navigate = useNavigate();
  const superAdminName = localStorage.getItem("superAdminName"); // Retrieve super admin's name from local storage

  const handleLogout = () => {
    // Clear the superAdminId and superAdminName from local storage
    localStorage.removeItem("superAdminId");
    localStorage.removeItem("superAdminName");

    // Redirect to the login page
    navigate("/");
  };

  return (
    <div className="navbar">
      <img className="logo" src={assest.logo} alt="Logo" />
      {superAdminName ? (
        <div className="navbar-right">
          <img className="profile" src={assest.profile} alt="Profile" />
          <p className="admin-greeting">Hi, {superAdminName}</p>
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
