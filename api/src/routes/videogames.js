const { Videogame } = require("../db");
const { Op } = require("sequelize");
const axios = require("axios").default;
const router = require("express").Router();
const { API_KEY } = process.env;
//https://api.rawg.io/api/games
//https://api.rawg.io/api/games?search={game}

async function videogamesFinder(options){
  const videogameslist = await Videogame.findAll(options);

  const info = [];
  for (let i = 0; i < videogameslist.length; i++) {
    info.push(videogameslist[i]);
  }
  return info
}


router.get("/", async function (req, res) {
  const name = req.query.name;
  try {
    if (name) {

      const options = {
        where: { name: { [Op.iLike]: `%${name}%` } },
        limit: 15,
      }

      let info = await videogamesFinder(options)

      axios
        .get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
        .then((response) => {
          const games = response.data.results.map((game) => ({
            id: game.id,
            name: game.name,
            platforms: game.platforms.map((element) => element.platform.name),
            release_date: game.released,
            background_image: game.background_image,
            rating: game.rating,
          }));
          return games;
        })
        .then((response) => {
          let counter = 0;
          while (info.length < 15) {
            info.push(response[counter]);
            counter++;
          }
        })
        .then(() => info && info.length > 0? res.status(201).send(info) : res.status(404).send("No results"))
        .catch((err) => res.status(400).send(err));
    } else {
      let info = await videogamesFinder()
      axios
      .get(`https://api.rawg.io/api/games?key=${API_KEY}`)
      .then((response) => {
        const games = response.data.results.map((game) => ({
          id: game.id,
          name: game.name,
          platforms: game.platforms.map((element) => element.platform.name),
          release_date: game.released,
          background_image: game.background_image,
          rating: game.rating,
        }));
        return games;
      })
      .then((response) => {
        for (let i = 0; i < response.length; i++) {
          info.push(response[i]);
      }})
      .then(() => info && info.length > 0? res.status(201).send(info) : res.status(404).send("No results"))
      .catch((err) => res.status(400).send(err));
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
