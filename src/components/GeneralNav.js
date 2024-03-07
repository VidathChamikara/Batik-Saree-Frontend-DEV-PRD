import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/landing.css";

import {
  ButtonDropdown,
  ButtonGroup,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Modal,
  ModalBody,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function GenaralNav() {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const [dropdownOpen, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);
  const toggleModal = () => setModalOpen(!modalOpen);

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./loginSignup";
  };
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
        <li className="link">
          <a href="#home">Home</a>
        </li>
        <li className="link">
          <a href="#about">About Us</a>
        </li>
        <li className="link">
          <a href="#contact">Contact Us</a>
        </li>
        <li className="link">
          <button onClick={logOut} className="nav__btn">
            Logout
          </button>
        </li>
        <ButtonGroup>
          <ButtonDropdown
            className="py-0"
            isOpen={dropdownOpen}
            toggle={toggle}
          >
            <DropdownToggle caret>Click me</DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={toggleModal}>Show Modal</DropdownItem>
              <Modal isOpen={modalOpen} toggle={toggleModal} size="lg">
                <ModalBody></ModalBody>
              </Modal>
            </DropdownMenu>
          </ButtonDropdown>
        </ButtonGroup>
      </ul>
    </nav>
  );
}

export default GenaralNav;
