import React from "react";
import GenaralNav from "../components/GeneralNav";
import SareeDesigner from "./SareeDesigner";

function Kandyan() {
  return (
    <div>
      <GenaralNav />
      <section className="homecontainer">
        <div className="image__welcome"></div>
        <div className="content__homecontainer">
          <h2>Model Number</h2>
          <SareeDesigner />
        </div>
      </section>
    </div>
  );
}

export default Kandyan;
