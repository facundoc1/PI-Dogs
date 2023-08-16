import React from "react";
import { Link } from "react-router-dom";
import style from "../Card/Card.module.css";

export default function Card({ image, name, temperaments, id }) {
    return (
      <Link className={style.link} to={"/dog-detail/" + id}>
        <div className={style.card}>
            <div className={style.image}>
                <img src={image} alt={name} />
            </div>
            <div className={style.breed}>
                <p title={name}>{name}</p>
            </div>
            <p className={style.text}>Temperaments:</p>
            <div className={`${style.temperaments}`}>
                {temperaments.map((temps) => (
                    <p key={temps + Math.random}>{temps}</p>
                ))}
            </div>
        </div>
      </Link>
    );
}
