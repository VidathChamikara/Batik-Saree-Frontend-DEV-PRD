import React from "react";
import GenaralNav from "../components/GeneralNav";
import ShirtDesigner from "./ShirtDesigner";

function Kandyan() {

    return(
        <div>
             <GenaralNav />
             <section className="homecontainer">
             <div className="content__homecontainer">
                <ShirtDesigner/>
             </div>
             </section>
        </div>
    )

}

export default Kandyan;