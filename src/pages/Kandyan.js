import React from "react";
import GenaralNav from "../components/GeneralNav";
import SareeDesigner from "./SareeDesigner";
import model from "../images/kandyan.jpg";

function Kandyan() {
  return (
    <div>
      <GenaralNav />
      <section className="homecontainer">
        <div className="image__model">
          <img src={model} alt="model" />
        </div>
        <div className="content__homecontainer">         
          <SareeDesigner />
        </div>
      </section>
    </div>
  );
}

export default Kandyan;
