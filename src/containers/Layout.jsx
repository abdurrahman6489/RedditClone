import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Outlet />
    </>
  );
};

export default Layout;
