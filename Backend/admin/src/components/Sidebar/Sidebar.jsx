import React from 'react';
import './Sidebar.css';
import { assest } from '../../assets/assest';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='sidebar-options'>


      <NavLink to='/dashboard' className='sidebar-option' activeClassName='active'>
          <img src={assest.dashboard} alt='Add Item' />
          <p>DashBoard</p>
        </NavLink>
        
        <NavLink to='/add' className='sidebar-option' activeClassName='active'>
          <img src={assest.addicon} alt='Add Item' />
          <p>Add Item</p>
        </NavLink>
        <NavLink to='/list' className='sidebar-option' activeClassName='active'>
          <img src={assest.order} alt='List Item' />
          <p>List Item</p>
        </NavLink>
        <NavLink to='/order' className='sidebar-option' activeClassName='active'>
          <img src={assest.order} alt='Order' />
          <p>Order List</p>
        </NavLink>

        <NavLink to='/users' className='sidebar-option' activeClassName='active'>
          <img src={assest.user} alt='Order' />
          <p>User List</p>
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
