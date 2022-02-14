const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require ('axios');
const { Occupation, Character } = require ('../db')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


// Me traigo la info de la Api
const getApiInfo = async () => {  // llama al end point de la api y me trae la información
    const apiUrl = await axios.get('https://breakingbadapi.com/api/characters')        // trabajo de manera asincrona porque no se cuanto va a demorar la api en traerme la info
    const apiInfo = await apiUrl.data.map(el => {
        return {     // aca solo me traigo la info que quiero usar
            name: el.name,
            img: el.img,
            nickname: el.nickname,
            status: el.status,
            id: el.char_id,
            occupation: el.occupation.map(el => el), // hago un map porque me trae un arreglo
            birthday: el.birthday,
            appearance: el.appearance.map(el => el),
        }
    })
    return apiInfo;
}


// Me traigo la info de la DB
const getDbInfo = async () => {
    return await Character.findAll({
        incluide:{ 
            model: Occupation,        // aca me traigo todos los personajes y ademas incluyo el modelo occupation
            attributes: ['name'],    // y del modelo occupation me traigo el atributo 'name'
            through: {
                attributes: [],
            }, 
        }
    })
}

const getAllCharacters = async () => {
    const apiInfo = await getApiInfo(); // llamo a las funciones
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo); // las concateno
    return infoTotal; // retorno todo
} 

router.get('/characters', async (req, res) => {
    const name = req.query.name // busco si hay un name por query
    let charactersTotal = await getAllCharacters();      //                paso todo a minusculas para compararlos
    if(name){ //si hay un name que me pasen por query                       /                           /
        let characterName = await charactersTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase())) // me fijo en cada elemento si incluye el name que le pase por query
        characterName.length ? //pregunto si encontro algo
        res.status(200).send(characterName) :
        res.status(404).send('No se encontró el personaje');
    } else {
        res.status(200).send(charactersTotal) // si no hay nada en query, mando todos
    }
})

router.get('/occupations', async (req, res) => {
    const occupationsApi = await axios.get('https://breakingbadapi.com/api/characters')
    const occupations = occupationsApi.data.map(el => el.occupation) 
    const occEach = occupations.map( el => {
        for (let i=0; i<el.length; i++) return el[i]}) //devulevo cada elemento de cada arreglo
    occEach.forEach(el => {
        Occupation.findOrCreate({  // me fijo si esta y si no esta, lo creo
            where: { name: el}
        })
    })    
    const allOccupations = await Occupation.findAll();
    res.send(allOccupations) 
})

router.post('/character', async (req, res) => {
    let {
        name,
        nickname,
        birthday,
        image,
        status,
        createdInDb,
        occupation
    } = req.body;

    let characterCreated = await Character.create({
        name,
        nickname,
        birthday,
        image,
        status,
        createdInDb  // no le paso occupation porque tengo que crear la relación aparte
    })

    let occupationDb = await Occupation.findAll({  // la ocupación la tengo que buscar en el modelo
        where: { name : occupation}
    })                            
    characterCreated.addOccupation(occupationDb)
    res.send('Personaje creado con éxito')
})


module.exports = router;
