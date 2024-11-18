import React from 'react';
import './Footer.css';
import { assets } from '../../assets/assets';

function Footer() {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="Order Up Logo" />
          <p>
            Order Up is a streamlined food ordering system designed to simplify the process of placing and managing orders. 
            Whether you're a customer looking for a quick meal or a restaurant managing multiple orders, Order Up ensures 
            a smooth, efficient, and user-friendly experience.
          </p>
          <div className="footer-social-item">
            <img src={assets.facebook} alt="Facebook" />
            <img src={assets.github} alt="GitHub" />
            <img src={assets.xx} alt="Social Media" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Get in Touch</h2>
          <ul>
            <li>+977 9840748285</li>
            <li>janaksanjel12@gmail.com</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>Careers</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        © 2024 Order Up. All rights reserved.
      </p>
    </div>
  );
}

export default Footer;
