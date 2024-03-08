import React from "react";
import GenaralNav from "../components/GeneralNav";

function GenaralHome() {
  return (
    <div>
      <GenaralNav />
      <section className="homecontainer">
        <div className="content__homecontainer">
          <h1>
            Hey Vidath !!!
            <br />
            <span className="heading__1">Welcome to our</span>
            <br />
            <span className="heading__2">Batik Saree</span>
          </h1>
        </div>
      </section>
    </div>
  );
}

export default GenaralHome;
