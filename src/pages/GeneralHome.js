import React from "react";
import GenaralNav from "../components/GeneralNav";

function GenaralHome({ userName }) {
  return (
    <div>
      <GenaralNav />
      <section className="homecontainer">
        <div className="content__homecontainer">
          <h1>
            Hey {userName} 👋
            <br />
            <span className="heading__1">Welcome to our</span>
            <br />
            <span className="heading__2">Batik Studio !!!</span>
          </h1>
          <p style={{ textAlign: "justify" }}>
            Welcome to our creative space! Imagine yourself as the designer of
            your dream saree. Let your imagination run wild as you embark on a
            journey to bring your unique vision to life. Let's begin weaving
            your masterpiece together!
          </p>
        </div>
      </section>
    </div>
  );
}

export default GenaralHome;
