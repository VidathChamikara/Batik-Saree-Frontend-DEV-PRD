import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import "../css/landing.css";

import {
  ButtonDropdown,
  ButtonGroup,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function GenaralNav() {
  const [menuActive, setMenuActive] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [userType, setUserType] = useState("");

  useEffect(() => {
    // Get user type from localStorage
    const storedUserType = window.localStorage.getItem("userType");
    setUserType(storedUserType);
  }, []);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  const logOut = () => {
    window.localStorage.clear();
    setRedirect(true); // Set redirect to true
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <nav>
      <div className="nav__logo">
        <a href="#home">Batik Saree</a>
      </div>
      <div
        className={`nav__burger ${menuActive ? "active" : ""}`}
        onClick={() => toggleMenu()}
      >
        <div></div>
        <div></div>
        <div></div>
      </div>
      <ul className={`nav__links ${menuActive ? "active" : ""}`}>
        {userType === "Admin" && ( // Render these links only for admin user
          <>
            <li className="link">
              <Link to="/adminHome" style={{ fontSize: "18px" }}>
                Home
              </Link>
            </li>

            <li className="link">
              <Link to="/kandyan" style={{ fontSize: "18px" }}>
                Showroom
              </Link>
            </li>
            <li className="link">
              <a href="#contact" style={{ fontSize: "18px" }}>
                Designs
              </a>
            </li>
            <li className="link">
              <a href="#contact" style={{ fontSize: "18px" }}>
                Users
              </a>
            </li>
          </>
        )}
        {userType === "General User" && ( // Render these links only for admin user
          <>
            <li className="link">
              <Link to="/generalHome" style={{ fontSize: "18px" }}>
                Home
              </Link>
            </li>
            <li className="link">
              <Link to="/kandyan" style={{ fontSize: "18px" }}>
                Showroom
              </Link>
            </li>
          </>
        )}
        <ButtonGroup>
          <ButtonDropdown
            className="py-0"
            isOpen={dropdownOpen}
            toggle={toggle}
          >
            <DropdownToggle
              caret
              style={{
                padding: "0.25rem 0.5rem",
                lineHeight: "1.5",
                backgroundColor: "white", // Set background color to white
                borderColor: "white", // Set border color to white
                color: "#5c48ee",
              }}
            >
              <i
                className="fa fa-user-circle-o"
                aria-hidden="true"
                style={{ fontSize: "35px", color: "#5c48ee" }} // Set icon color to black
              ></i>{" "}
              {/* Icon instead of text */}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={logOut}>Logout</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </ButtonGroup>
      </ul>
    </nav>
  );
}

export default GenaralNav;
