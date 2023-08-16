import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getBreed } from "../../redux/actions/index.js";
import style from "../SearchBar/SearchBar.module.css";

export default function SearchBar() {
    const [dogState, setDogsState] = useState("");
    const dispatch = useDispatch();
  
    function handleClick(e) {
      e.preventDefault();
      
      if (dogState.length === 0) {
        return alert("Please type a name to start the search");
      } else {
        dispatch(getBreed(dogState));
        setDogsState("");
      }
    }
  
    return (
      <div className={style.searchBarObject}>
        <input
          type="text"
          placeholder="Search a dog..."
          className={style.input}
          value={dogState}
          onChange={(e) => setDogsState(e.target.value)}
        />
        <button type="submit" onClick={handleClick} className={style.button}>search</button>
      </div>
    );
  }
