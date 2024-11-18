import React from 'react';
import './promocode.css';

function Promocode() {
  return (
    <div className="promo-container">
      <div className="card">
        <div className="image">
          <div className="promo-text">ROJ35</div>
        </div>
        <div className="content">
          <p className="text-1">Run with the pack</p>
          <div className="text-2">
            <span>Get 35% off</span>
            <span>On your next order On OrderUp</span>
          </div>
          <a className="action" href="http://localhost:5173/#explore-menu">
          Use Promocode
          </a>
          <p className="date">Expire</p>
        </div>
      </div>
      <div className="card">
        <div className="image">
          <div className="promo-text">FREE35</div>
        </div>
        <div className="content">
          <p className="text-1">Run with the pack</p>
          <div className="text-2">
            <span>Get 35% off</span>
            <span>On your next order On OrderUp</span>
          </div>
          <a className="action" href="http://localhost:5173/#explore-menu">
          Use Promocode
          </a>
          <p className="date">Expire</p>
        </div>
      </div>
      <div className="card">
        <div className="image">
          <div className="promo-text">SAVE20</div>
        </div>
        <div className="content">
          <p className="text-1">Run with the pack</p>
          <div className="text-2">
            <span>Get 20% off</span>
            <span>On your next order On OrderUp</span>
          </div>
          <a className="action" href="http://localhost:5173/#explore-menu">
            Use Promocode
          </a>
          <p className="date">Offer valid until 29th April, 2025 </p>
        </div>
      </div>
    </div>
  );
}

export default Promocode;
