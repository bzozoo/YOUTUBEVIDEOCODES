import React from "react";
import "./header.css";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <div className="header-container">
      <nav className="navbar">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/products">Products</NavLink>
          </li>
          <li>
            <NavLink to="/about">AboutUs</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
