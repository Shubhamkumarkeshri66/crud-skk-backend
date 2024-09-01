import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  return (
    <div>
      <nav>
        <ul className="navbar1">
          <li>
            <NavLink to="/">Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/insertData">InsertData</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
