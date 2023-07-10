import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../images/logo.svg";
import NavBar from "./NavBar";

function Header(props) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="header">
      <img src={logo} alt="место-Россия" className="header__img" />
      <NavBar onLogOut={props.onLogOut} email={props.email}></NavBar>
    </header>
  );
}

export default Header;
