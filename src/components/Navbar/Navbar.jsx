import React from "react";
import "./Navbar.css";
const Navbar = ({ children }) => {
  return <nav className="navbarContainer">{children}</nav>;
};

export default Navbar;
