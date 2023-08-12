import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getBreed } from "../../Redux/actions/index.js";
import style from "../SearchBar/SearchBar.module.css";

export default function SearchBar() {
    const dispatch = useDispatch();
    const [searchDog, setSearchDog] = useState("");

    const handleInput = (e) => {
        e.preventDefault();
        setSearchDog(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getBreed(searchDog));
    };

    return (
        <div className={style.searchbar_container}>
            <input
                className={`${style.searchbar}`}
                type="text"
                onChange={handleInput}
                placeholder="Search..."
            />
            <button
                className={`${style.searchbar_button}`}
                type="submit"
                onClick={handleSubmit}
            >
                <i className="fa-solid fa-magnifying-glass"></i>
            </button>
        </div>
    );
}
