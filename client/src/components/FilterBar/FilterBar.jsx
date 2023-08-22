import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDogs,
  getTemperaments,
  FilterByTemperament,
  OrderByName,
  OrderByWeight,
  filterCreated,
} from "../../redux/actions/index.js";

function FilterBar() {
  const dispatch = useDispatch();
  const allTemperaments = useSelector((state) => state.temperaments);

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
  };

  const handleOrderByWeight = (e) => {
    e.preventDefault();
    dispatch(OrderByWeight(e.target.value));
  };

  const handleFilterCreated = (e) => {
    const value = e.target.value;
    if (value === "all") {
      dispatch(getAllDogs()); // Mostrar tanto creados como de la base de datos
    } else {
      dispatch(filterCreated(value)); // Filtrar por origen (inDB o created)
    }
  };

  return (
    <>
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
      <select
        onChange={(e) => {
          handleFilterCreated(e);
        }}
      >
        <option disabled defaultValue value="all">
          Filter by source
        </option>
        <option value="all">All</option>
        <option value="inDB">Database</option>
        <option value="created">Created</option>        
      </select>
    </>
  );
}

export default FilterBar;
