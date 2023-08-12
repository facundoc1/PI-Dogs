import React from "react";
import { Link } from "react-router-dom";
import style from "../LandingPage/LandingPage.module.css";
import "../LandingPage/ButtonHome.css"

function LandingPage() {
  return (
    <div className={`${style.main_container}`}>
      <div className={`${style.main_left_container}`}>
        <h1 className={`${style.titleApp}`} >A DOGPEDIA</h1>
        <h3>Aplication about man's best friend</h3>
        <div className={`${style.left_paragraph}`}>
          <p>Here you can get information about multiple dog breed names and details such as their size, life expectancy and temperament, and you can also add new ones</p>
        </div>
        
        <Link to="/home">
            <button className="button_home">Go home</button>
        </Link>
      </div>
    </div>
  );
}

export default LandingPage;