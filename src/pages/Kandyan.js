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
          <h3>Model Number</h3>
          <SareeDesigner />
        </div>
      </section>
    </div>
  );
}

export default Kandyan;
