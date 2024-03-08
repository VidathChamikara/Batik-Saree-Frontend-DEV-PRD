import React from "react";
import GenaralNav from "../components/GeneralNav";

function AdminHome() {
  return (
    <div>
      <GenaralNav />
      <section className="homecontainer">
        <div className="content__homecontainer">
          <h1>
            Hey Admin 👋
            <br />
            <span className="heading__1">Welcome to the</span>
            <br />
            <span className="heading__2">Batik Admin Panel</span>
          </h1>
          <p style={{ textAlign: "justify" }}>
            Welcome to the Batik Admin Panel! Dive into a world where you have the
            power to customize every aspect of your design. From selecting
            intricate patterns to managing your clientele, unleash your
            creativity and take control of your Batik journey. Let's craft
            unforgettable creations together!
          </p>
        </div>
      </section>
    </div>
  );
}

export default AdminHome;
