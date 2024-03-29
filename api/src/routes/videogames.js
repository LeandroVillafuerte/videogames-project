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
    platforms: resp.platforms.map((element) => {
      return element.platform.name;
      /* id:element.platform.id, */
    }),
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

router.get("/", async function (req, res, next) {
  const name = req.query.name;
  if (name) {
    const options = {
      where: { name: { [Op.iLike]: `%${name}%` } },
      include: [{ model: Genre }],
    };

    let info = await videogamesFinder(options);

    axios
      .get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`)
      .then((response) => {
        const games = response.data.results.map((game) => responseObject(game));
        let auxindex = 0;
        while (info.length < 15) {
          info.push(games[auxindex]);
          auxindex++;
        }
        info && info.length > 0
          ? res.status(200).send(info)
          : res.status(404).send("No results");
      })
      .catch(next);
  } else {
    let info = [];
    info = await videogamesFinder({ include: [{ model: Genre }] });

    Promise.all([
      axios.get(`https://api.rawg.io/api/games?key=${API_KEY}`),
      axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`),
      axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`),
      axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`),
      axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`),
    ])
      .then((response) => {
        let pages = [];
        for (let i = 0; i < response.length; i++) {
          pages = [...pages, ...response[i].data.results];
        }
        const games = pages.map((game) => responseObject(game));
        info = [...info, ...games];
        info && info.length > 0
          ? res.status(200).send(info)
          : res.status(404).send("No results");
      })
      .catch(next);
  }
});

module.exports = router;
