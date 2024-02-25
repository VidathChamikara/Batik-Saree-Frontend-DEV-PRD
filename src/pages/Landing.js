import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/home.css"; // Make sure to import your CSS file
import header1 from "../images/header-1.jpg";
import header2 from "../images/header-2.jpg";
import sample from "../images/sample.webm";

function Landing() {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <div>
      <nav>
        <div className="nav__logo">
          <a href="https://www.facebook.com">Batik Saree</a>
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
            <Link to="/loginSignup" className="nav__btn">
              Register & Login
            </Link>
          </li>
        </ul>
      </nav>
      <section id="home" className="homecontainer">
        <div className="content__homecontainer">
          <h1>
            Best Saree
            <br />
            <span className="heading__1">Design Platform</span>
            <br />
            <span className="heading__2">in The Sri Lanka</span>
          </h1>
          <p style={{ textAlign: "justify" }}>
            Design your own essence of luxury and style saree with Batilk Saree.
            Our curated saree collection showcases the finest fabrics and
            designs, offering you unparalleled elegance and comfort.
          </p>
        </div>
        <div className="image__container">
          <img src={header1} alt="header" />
          <img src={header2} alt="header" />
          <div className="image__content">
            <ul>
              <li>You can design your saree</li>
              <li>Newest Pattern</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="about" className="homecontainer">
        <div className="video__container">
          <video autoPlay muted controls loop>
            <source src={sample} type="video/webm" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="content__homecontainer">
          <h1>
            <span className="heading__2">About Us</span>
          </h1>
          <p style={{ textAlign: "justify" }}>
            At Batik Saree, we are passionate about bringing you the best in
            Saree design and quality. Our curated collection showcases the
            finest fabrics and designs, offering you unparalleled elegance and
            comfort. With a focus on tradition and innovation, we strive to
            provide you with a unique and unforgettable Saree experience.
          </p>
        </div>
      </section>

      <section id="contact" className="homecontainer">
        <div className="content__homecontainer">
          <h1>
            <span className="heading__2">Contact Us</span>
          </h1>
          <p style={{ textAlign: "justify" }}>
           Reach out to us for any inquiry.
          </p>
          <section className="get_in_touch">
            <h1 className="title">Form</h1>

            <div className="contact-container">
              <div className="contact-form row">
                <div className="form-field col-lg-6">
                  <input id="name" className="input-text" type="text" name="" />
                  <label htmlFor="name" className="label">
                    Name
                  </label>
                </div>

                <div className="form-field col-lg-6">
                  <input
                    id="email"
                    className="input-text"
                    type="email"
                    name=""
                  />
                  <label htmlFor="email" className="label">
                    Email
                  </label>
                </div>

                <div className="form-field col-lg-12">
                  <input
                    id="message"
                    className="input-text"
                    type="text"
                    name=""
                  />
                  <label htmlFor="message" className="label">
                    Message
                  </label>
                </div>

                <div className="form-field col-lg-12">
                  <input
                    className="submit-btn"
                    type="submit"
                    value="Submit"
                    name=""
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="image__container">
          <img src={header1} alt="header" />
          <img src={header2} alt="header" />
          <div className="image__content">
            <ul>
              <li>You can design your saree</li>
              <li>Newest Pattern</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Landing;