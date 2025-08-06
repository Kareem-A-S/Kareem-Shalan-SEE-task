import React from "react";
import "animate.css";

function Header() {
  return (
    <div className="myHeader">
      <img src="/resources/SEELogo.png" alt="Logo" className="headerLogo" />
      <a href="#">Home</a>
      <a href="#">About</a>
      <a href="#"> Features</a>
      <a href="#">Careers</a>
    </div>
  );
}

export default Header;
