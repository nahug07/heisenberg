import React from "react";
import {Link} from "react-router-dom";
import stl from "./LandingPage.module.css"

export default function LandingPage(){
    return(
        <div className={stl.conteinerLanding}>
            <Link to='/home'>
                <button className={stl.buttonLanding}>INICIO</button>
            </Link>
        </div>
    )
}