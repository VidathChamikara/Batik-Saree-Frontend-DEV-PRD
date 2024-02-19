import React, { useState } from "react";
import "../css/home.css"; // Make sure to import your CSS file
import header1 from "../images/header-1.jpg";
import header2 from "../images/header-2.jpg";

function Home() {
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
        <div className={`nav__burger ${menuActive ? 'active' : ''}`} onClick={() => toggleMenu()}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <ul className={`nav__links ${menuActive ? 'active' : ''}`}>
          <li className="link">
            <a href="https://www.facebook.com">Home</a>
          </li>
          <li className="link">
            <a href="https://www.facebook.com">Kandyan</a>
          </li>
          <li className="link">
            <a href="https://www.facebook.com">Indian</a>
          </li>
          <li className="link">
            <a href="https://www.facebook.com">Contact Us</a>
          </li>
        </ul>
      </nav>
      <section className="homecontainer">
        <div className="content__homecontainer">
          <h1>
            Best Saree
            <br />
            <span className="heading__1">Design Platform</span>
            <br />
            <span className="heading__2">in The Sri Lanka</span>
          </h1>
          <p>
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
              <li>Get 30% off on every 1st month</li>
              <li>Newest Pattern</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
