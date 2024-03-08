import React from "react";
import GenaralNav from "../components/GeneralNav";

function AdminHome() {
  return (
    <div>
      <GenaralNav />
      <section className="homecontainer">
      <div className="content__homecontainer">
          <h1>
            Hey Admin !!!
            <br />
            <span className="heading__1">Welcome to the</span>
            <br />
            <span className="heading__2">Batik Saree Admin Panel</span>
          </h1>
        </div>
      </section>
    </div>
  );
}

export default AdminHome;
