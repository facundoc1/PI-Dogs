import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTemperaments, postDog } from "../../redux/actions";

import style from "../FormAddDog/FormAddDog.module.css";

export default function FormAddDog() {
    const dispatch = useDispatch();
    const temperaments = useSelector((state) => state.temperaments);
    const validate = (form) => {
        let errors = {};
        if (!form.name) {
            errors.name = "Name is required, it should not contain numbers";
        }
        if (!form.min_height || !form.max_height) {
            errors.height = "Height is required";
        }
        if (!form.min_weight || !form.max_weight) {
            errors.weight = "Weight is required";
        }
        if (!form.life_span) {
            errors.life_span =
                "Lifespan is required, type only numbers separated by a dash (-)";
        }
        return errors;
    };

    const [button, setButton] = useState(true);
    const [errors, setErrors] = useState({
        name: "",
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        life_span: "",
        image: "",
    });

    const [form, setForm] = useState({
        name: "",
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        life_span: "",
        image: "",
        temperaments: [],
    });

    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch]);

    useEffect(() => {
        if (
            form.name.length > 0 &&
            form.min_height.length > 0 &&
            form.max_height.length > 0 &&
            form.min_weight.length > 0 &&
            form.max_weight.length > 0
        )
            setButton(false);
        else setButton(true);
    }, [form, setButton]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (parseInt(form.min_weight) > parseInt(form.max_weight)) {
            alert("Minimum weight cannot be greater than maximum weight");
            return;
        }

        if (parseInt(form.min_height) > parseInt(form.max_height)) {
            alert("Minimum height cannot be greater than maximum height");
            return;
        }
        if (form.temperaments.length === 0) {
            alert("At least one temperament must be selected");
            return;
        }

        try {
            await dispatch(postDog(form));
            alert("The new dog was added successfully");
            setForm({
                name: "",
                min_height: "",
                max_height: "",
                min_weight: "",
                max_weight: "",
                life_span: "",
                image: "",
                temperaments: [],
            });
        } catch (error) {
            alert("Error adding dog: " + error.message);
            console.error("Error adding dog:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value,
        });

        setErrors({
            ...errors,
            [name]: validate({ ...form, [name]: value })[name],
        });
    };

    const handleSelect = (e) => {
        const selectedTemperament = e.target.value;
        if (!form.temperaments.includes(selectedTemperament)) {
            setForm({
                ...form,
                temperaments: [...form.temperaments, selectedTemperament],
            });
        }
    };

    const handleDelete = (el) => {
        setForm({
            ...form,
            temperaments: form.temperaments.filter((temp) => temp !== el),
        });
    };

    return (
        <div className={style.main_wrapper}>
            <div className={style.container}>
                <Link to="/home">
                    <button className={style.button_to_home}>Go home</button>
                </Link>
                <form
                    action=""
                    id="form"
                    onSubmit={handleSubmit}
                    className={`${style.form}`}
                >
                    <div className={style.name_container}>
                        <input
                            className={style.input_name}
                            type="text"
                            value={form.name}
                            name="name"
                            onChange={(e) => handleChange(e)}
                            placeholder="Name..."
                        />
                    </div>
                    <div className={style.error_form}>
                        {errors.name && <p>{errors.name}</p>}
                    </div>

                    <div className={style.height_container}>
                        <div className={style.min_height}>
                            <input
                                type="text"
                                value={form.min_height}
                                name="min_height"
                                placeholder="Min height..."
                                onChange={(e) => handleChange(e)}
                            />
                            <div className={style.error_form}>
                                {errors.min_height && (
                                    <p>{errors.min_height}</p>
                                )}
                            </div>
                        </div>

                        <div className={style.max_height}>
                            <input
                                type="text"
                                value={form.max_height}
                                name="max_height"
                                placeholder="Max height..."
                                onChange={(e) => handleChange(e)}
                            />
                            <div className={style.error_form}>
                                {errors.max_height && (
                                    <p>{errors.max_height}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={style.error_form}>
                        {errors.height && <p>{errors.height}</p>}
                    </div>

                    <div className={style.weight_container}>
                        <div className={style.min_weight}>
                            <input
                                type="text"
                                value={form.min_weight}
                                name="min_weight"
                                placeholder="Min weight..."
                                onChange={(e) => handleChange(e)}
                            />
                            <div className={style.error_form}>
                                {errors.min_weight && (
                                    <p>{errors.min_weight}</p>
                                )}
                            </div>
                        </div>

                        <div className={style.max_weight}>
                            <input
                                type="text"
                                value={form.max_weight}
                                name="max_weight"
                                placeholder="Max weight..."
                                onChange={(e) => handleChange(e)}
                            />
                            <div className={style.error_form}>
                                {errors.max_weight && (
                                    <p>{errors.max_weight}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={style.error_form}>
                        {errors.weight && <p>{errors.weight}</p>}
                    </div>

                    <div className="life-span-container">
                        <input
                            type="text"
                            autoComplete="off"
                            name="life_span"
                            value={form.life_span}
                            placeholder="lifespan exam: 10 - 12"
                            onChange={(e) => handleChange(e)}
                        />
                        <div className={style.error_form}>
                            {errors.life_span && <p>{errors.life_span}</p>}
                        </div>
                    </div>

                    <div className="image-container">
                        <input
                            type="text"
                            autoComplete="off"
                            value={form.image}
                            name="image"
                            placeholder="Image URL..."
                            onChange={(e) => handleChange(e)}
                        />
                    </div>

                    <div className={""}>
                        <h3>Select Temperaments</h3>
                    </div>

                    <div className={""}>
                        <select
                            className={style.select_temperaments}
                            onChange={handleSelect}
                        >
                            <option defaultValue>Temperaments</option>
                            {temperaments.map((d) => (
                                <option
                                    value={d.name}
                                    key={d.name + Math.random()}
                                    className={style.option_temperament}
                                >
                                    {d.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={style.container_button_add_dog}>
                        <button
                            className={style.button_add_dog}
                            disabled={button}
                            type="submit"
                            form="form"
                        >
                            Create Dog
                        </button>
                    </div>
                </form>

                <div className="">
                    <div className="">
                        <h2>Temperaments</h2>
                    </div>

                    <div className={style.container_temperaments}>
                        {form.temperaments.map((el) => (
                            <div
                                className={style.element_temperament}
                                key={el}
                                onClick={() => handleDelete(el)}
                            >
                                <p>{`${el}`}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
