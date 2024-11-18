import React from "react";
import "./Sidebar.css";
import { assest } from "../../assets/assest";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink
          to="/dashboard"
          className="sidebar-option"
          activeClassName="active"
        >
          <img src={assest.dashboard} alt="Add Item" />
          <p>DashBoard</p>
        </NavLink>

        <NavLink to="/add" className="sidebar-option" activeClassName="active">
          <img src={assest.addicon} alt="Add Item" />
          <p>Add Restaurant</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
