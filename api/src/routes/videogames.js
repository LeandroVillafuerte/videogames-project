const { Videogame, Genre } = require("../db");
const { Op } = require("sequelize");
const axios = require("axios").default;
const router = require("express").Router();
const { API_KEY } = process.env;

//////////////////////////////////////End Points API//////////////////////////////////////////////

//https://api.rawg.io/api/games
//https://api.rawg.io/api/games?search={game}

//////////////////////////////Aux Functions/////////////////////////////////////////////

async function videogamesFinder(options) {
  const videogameslist = await Videogame.findAll(options);

  const info = [];
  for (let i = 0; i < videogameslist.length; i++) {
    info.push(videogameslist[i]);
  }
  return info;
}

function responseObject(resp) {
  return {
    id: resp.id,
    name: resp.name,
    platforms: resp.platforms.map((element) => element.platform.name),
    release_date: resp.released,
    background_image: resp.background_image,
    rating: resp.rating,
    genres: resp.genres.map((element) => {
      return {
        id: element.id,
        name: element.name,
        image_background: element.image_background,
      };
    }),
  };
}

////////////////////////////////// Routes //////////////////////////////////////////////////////

router.get("/", async function (req, res) {
  const name = req.query.name;
  try {
    
    

    if (name) {

      const options = {
        where: { name: { [Op.iLike]: `%${name}%` } },
        include: { model: Genre },
      };
  
      let info = await videogamesFinder(options);

      axios
        .get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
        .then((response) => {
          const games = response.data.results.map((game) =>
            responseObject(game)
          );
          return games;
        })
        .then((response) => {
          let counter = 0;
          while (info.length < 15) {
            info.push(response[counter]);
            counter++;
          }
        })
        .then(() =>
          info && info.length > 0
            ? res.status(200).send(info)
            : res.status(404).send("No results")
        )
        .catch((err) => res.status(400).send(err));
    } else {
      let info = []
      info = await videogamesFinder({include:{model:Genre}})
      axios
        .get(`https://api.rawg.io/api/games?key=${API_KEY}`)
        .then((response) => {
          const games = response.data.results.map((game) =>
            responseObject(game)
          );
          return games;
        })
        .then((response) =>{
          info = [...info, ...response];
          info && info.length > 0
            ? res.status(200).send(info)
            : res.status(404).send("No results")
        })
        .catch((err) => res.status(400).send(err));
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
