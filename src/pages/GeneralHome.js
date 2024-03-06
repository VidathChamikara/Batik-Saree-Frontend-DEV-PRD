import React from "react";
import GenaralNav from "../components/GeneralNav";

function GenaralHome() {
 
  return (
   <div>
    <GenaralNav/>
    <section className="homecontainer">
    <div className="content__homecontainer">
    <h1>
        This is General User Home
    </h1>
    </div>
    </section>
   </div>
  );
}

export default GenaralHome;