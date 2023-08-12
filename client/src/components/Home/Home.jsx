import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    getAllDogs,
    getTemperaments,
    FilterByTemperament,
    OrderByName,
    OrderByWeight,
} from "../../Redux/actions/index.js";
import Card from "../Card/Card";
import Paginate from "../Paginate/Paginate";
import SearchBar from "../SearchBar/SearchBar";

import style from "../Home/Home.module.css";

function Home() {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    const allTemperaments = useSelector((state) => state.temperaments);

    const [currentPage, setCurrentPage] = useState(1);
    const dogsPerPage = 8;
    const lastIndex = currentPage * dogsPerPage;
    const firstIndex = lastIndex - dogsPerPage;
    const currentDogs = allDogs.slice(firstIndex, lastIndex);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const [orden, setOrden] = useState("");

    useEffect(() => {
        dispatch(getAllDogs());
        dispatch(getTemperaments());
    }, [dispatch]);

    const handleFilterByTemperament = (e) => {
        e.preventDefault();
        dispatch(FilterByTemperament(e.target.value));
    };

    const handleOrderByName = (e) => {
        e.preventDefault();
        dispatch(OrderByName(e.target.value));
        setOrden(`Ordenado ${e.target.value}`);
    };

    const handleOrderByWeight = (e) => {
        e.preventDefault();
        dispatch(OrderByWeight(e.target.value));
        setOrden(`Ordenado ${e.target.value}`);
    };
    const handleOrderByHeight = (e) => {
      e.preventDefault();
  };

    return (
        <>
            <header className={`${style.header}`}>
                <div className={`${style.header_container_left}`}>
                    <Link to="/">
                        <div className={`${style.logo}`}>HOME MENU</div>{" "}
                        {/* logo  */}
                    </Link>

                    <div className={`${style.header_left}`}>
                        <SearchBar />

                        <div className={`${style.container_filters}`}>
                            <select onChange={handleOrderByName}>
                                <option disabled defaultValue>
                                    Alphabetical order
                                </option>
                                <option value="A-Z">A-Z</option>
                                <option value="Z-A">Z-A</option>
                            </select>

                            <select onChange={handleOrderByWeight}>
                                <option disabled defaultValue>
                                    Filter by weight
                                </option>
                                <option value="max_weight">Max</option>
                                <option value="min_weight">Min</option>
                            </select>

                            <select onChange={handleOrderByHeight}>
                                <option disabled defaultValue>
                                    Filter by height
                                </option>
                                <option value="max_height">Max</option>
                                <option value="min_height">Min</option>
                            </select>

                            <select onChange={handleFilterByTemperament}>
                                <option disabled defaultValue>
                                    Temperaments
                                </option>
                                <option value="Todos">All</option>
                                {allTemperaments?.map((temp) => (
                                    <option value={temp.name} key={temp.id}>
                                        {temp.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div className={`${style.header_right}`}>
                    <Link to="/dog">
                        <button className={`${style.button_add_dog}`}>
                            CREATE DOG
                        </button>
                    </Link>
                </div>
            </header>

            <hr />

            <div className={style.main_container}>
                <div className={style.container_cards}>
                    {currentDogs?.map((el) => {
                        return (
                            <div
                                className={`${style.container_card}`}
                                key={el.id}
                            >
                                <Link to={"/dog-detail/" + el.id}>
                                    {
                                        <Card
                                            key={el.id}
                                            image={el.image}
                                            name={el.name}
                                            temperaments={
                                                el.temperaments[0].name
                                                    ? el.temperaments.map(
                                                          (el) => el.name
                                                      )
                                                    : el.temperaments
                                            }
                                        />
                                    }
                                </Link>
                            </div>
                        );
                    })}
                </div>
                <div className={`${style.pagination}`}>
                    <Paginate
                        dogsPerPage={dogsPerPage}
                        allDogs={allDogs.length}
                        paginado={paginado}
                    />{" "}
                    {/*el valor de la funcion de paginado aumenta segun el bucle for en el componente Paginate*/}
                </div>
            </div>
        </>
    );
}

export default Home;
