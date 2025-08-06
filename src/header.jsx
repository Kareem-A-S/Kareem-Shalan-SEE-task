import React from "react";
import "animate.css";

function Header() {
  return (
    <div className="myHeader">
      <img src="/resources/SEELogo.png" alt="Logo" className="headerLogo" />
      <a href="#" className="roboto-serif-font">
        Home
      </a>
      <a href="#" className="roboto-serif-font">
        About
      </a>
      <a href="#" className="roboto-serif-font">
        {" "}
        Features
      </a>
      <a href="#" className="roboto-serif-font">
        Careers
      </a>
    </div>
  );
}

export default Header;
