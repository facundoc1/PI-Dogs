import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import FilterBar from "../FilterBar/FilterBar";
import SearchBar from "../SearchBar/SearchBar";
import style from "../Home/Home.module.css";
import logo from "./logo.png";

function Home() {
    const allDogs = useSelector((state) => state.dogs);
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage] = useState(8);
    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);
    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <header className={`${style.header}`}>
                <div className={`${style.logo}`}>
                    <Link to="/">
                        <img src={logo} alt="logo" />
                    </Link>
                </div>
                <div className={`${style.search_filter}`}>
                    <div className={`${style.search}`}>
                        <SearchBar />
                    </div>
                    <div className={`${style.filter}`}>
                        <FilterBar />
                    </div>
                </div>
                <div className={`${style.create}`}>
                    <Link to="/dog">
                        <button className={`${style.button_add_dog}`}>
                            Create dog
                        </button>
                    </Link>
                </div>
            </header>

            <div className={style.container}>
                <div className={style.cards}>
                    {currentDogs?.map((el) => {
                        return (
                            <Card
                                key={el.id}
                                id={el.id}
                                image={el.image}
                                name={el.name}
                                temperaments={
                                    el.temperaments && el.temperaments[0]?.name
                                        ? el.temperaments.map(
                                              (temp) => temp.name
                                          )
                                        : el.temperaments
                                }
                            />
                        );
                    })}
                </div>
                <div className={`${style.pagination}`}>
                    <Pagination
                        dogsPerPage={dogsPerPage}
                        allDogs={allDogs.length}
                        pagination={pagination}
                        currentPage={currentPage}
                    />{" "}
                </div>
            </div>
        </>
    );
}

export default Home;
