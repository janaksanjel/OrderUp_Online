import React from "react";
import "./Footer.css";

function Footer({ footer }) {
  return (
    <div className="footer no-edit">
      <p>© 2024 OrderUP SuperAdmin. All rights reserved. ||{footer} </p>
    </div>
  );
}

export default Footer;
