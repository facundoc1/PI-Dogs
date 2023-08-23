const { Router } = require("express");
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;
const express = require("express");
const axios = require("axios");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
let urLink = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

const getApiData = async () => {
    const apiData = await axios.get(urLink);
    const apiInfo = await apiData.data.map((el) => {
        let temperamentArray = [];
        if (el.temperament) {
            temperamentArray = el.temperament.split(", ");
        }

        let heightArray = [];
        if (el.height.metric) {
            heightArray = el.height.metric.split(" - ");
        }

        let weightArray = [];
        if (el.weight.metric) {
            weightArray = el.weight.metric.split(" - ");
        }
        return {
            id: el.id,
            image: el.image.url,
            name: el.name,
            height: heightArray,
            weight: weightArray,
            temperaments: temperamentArray,
            life_span: el.life_span,
        };
    });
    return apiInfo;
};
//-- Get data from the database posgrest--//
const getFromDb = async () => {
    return await Dog.findAll({
        include: [{
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes: [],
            },
        }],
    });
    /* const dogsFromDB = await Dog.findAll({
        raw: true,
        nest: true,
        include: [{
            model: Temperament,
            attributes: ["name"],
            through: {
                attributes: [],
            },
        }],
    });
    return dogsFromDB; */
};

/* const mapDogs = (dogsFromDB) => {
    return dogsFromDB.map(dog => {
        
    });
} */


//combine data from API and databasere
const getAllDogs = async () => {
    const dataFromApi = await getApiData();
    const dataFromDb = await getFromDb();
    //const dataCool = mapDogs(dataFromDb);
    //dataCool.forEach(dog => console.log(dog));
    const allDataMixed = [...dataFromApi, ...dataFromDb];
    return allDataMixed;
};

//--endpoints--//
router.get("/dogs", async (req, res) => {
    // const name = req.query.name;
    const { name } = req.query;
    const allDogs = await getAllDogs();
    if (name) {
        const dog = allDogs.filter((d) =>
            d.name.toLowerCase().includes(name.toLowerCase())
        );
        dog.length
            ? res.status(200).send(dog)
            : res.status(404).send("Dog not found");
    } else {
        res.status(200).send(allDogs);
    }
});

router.get("/dogs/:idRaza", async (req, res) => {
    const { idRaza } = req.params;
    const allDogs = await getAllDogs();
    const dog = allDogs.filter((el) => el.id == idRaza);
    if (dog.length) {
        res.status(200).json(dog);
    } else {
        res.status(404).send("Dog no found in the Data");
    }
});

router.get("/dogs/orderByWeight/max_weight", async (req, res) => {
    const allDogs = await getAllDogs();
    const sortedDogsByMaxWeight = allDogs.slice().sort((a, b) => {
        if (a.weight && b.weight && a.weight[1] && b.weight[1]) {
            return b.weight[1] - a.weight[1];
        }
        return 0;
    });
    res.status(200).send(sortedDogsByMaxWeight);
});

router.get("/dogs/orderByWeight/min_weight", async (req, res) => {
    const allDogs = await getAllDogs();
    const sortedDogsByMinWeight = allDogs.slice().sort((a, b) => {
        if (a.weight && a.weight[0] && b.weight && b.weight[0]) {
            return a.weight[0] - b.weight[0];
        }
        return 0;
    });
    res.status(200).send(sortedDogsByMinWeight);
});

router.get("/temperament", async (req, res) => {
    const temperamentsApi = await axios.get(
        `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );
    const temperaments = temperamentsApi.data.map((t) => t.temperament);
    const temps = temperaments.toString().split(",");
    temps.forEach((el) => {
        let i = el.trim();
        Temperament.findOrCreate({
            where: { name: i },
        });
    });

    const allTemp = await Temperament.findAll();
    res.send(allTemp);
});

router.post("/dog", async (req, res) => {
    let {
        name,
        min_height,
        max_height,
        min_weight,
        max_weight,
        life_span,
        temperaments,
        image,
    } = req.body;

    try {
        if (
            !name ||
            isNaN(min_height) ||
            isNaN(max_height) ||
            isNaN(min_weight) ||
            isNaN(max_weight)
        ) {
            throw new Error("Invalid data format");
        }

        let dog = await Dog.create({
            name,
            height_min: min_height,
            height_max: max_height,
            weight_min: min_weight,
            weight_max: max_weight,
            life_span,
            image: image
                ? image
                : "https://st3.depositphotos.com/1146092/17219/i/450/depositphotos_172190006-stock-photo-question-marks-dog.jpg",
        });

        let associatedTemp = await Temperament.findAll({
            where: { name: temperaments },
        });
        dog.addTemperament(associatedTemp);

        res.status(200).send("Dog created successfully!");
    } catch (error) {
        res.status(400).send("Error creating dog: " + error.message);
    }
});

router.use(express.json());

module.exports = router;
