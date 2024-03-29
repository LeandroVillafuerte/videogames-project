const { Videogame, Genre } = require("../db");
const router = require("express").Router();
const axios = require("axios").default;
const { API_KEY } = process.env;

//////////////////////////////////////End Points API//////////////////////////////////////////////
//https://api.rawg.io/api/games/{id}

////////////////////////////////////Aux Functions/////////////////////////////////////////////
function responseObject(resp) {
  return {
    id: resp.id,
    name: resp.name,
    description: resp.description_raw,
    release_date: resp.released,
    rating: resp.rating,
    platforms: resp.platforms.map((element) => element.platform.name),
    genres: resp.genres.map((element) => element.id),
    background_image: resp.background_image,
    background_image_additional: resp.background_image_additional,
    website: resp.website,
  };
}
/////////////////////////////////////Routes///////////////////////////////////////////////////

router.get("/:id", async function (req, res,next) {
  const { id } = req.params;

  try {
    const videogameElement = await Videogame.findByPk(id, {
      include: Genre,
    });
    if (!videogameElement) {
      axios
        .get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
        .then((response) => {
          const resp = response.data;
          let game = responseObject(resp)
          res.status(200).send(game);
        })
        .catch(next);
    } else {
      res.status(200).send(videogameElement);
    }
  } catch (e) {
    next(e)
  }
});

router.post("/", async function (req, res,next) {
  const {
    name,
    description,
    release_date,
    rating,
    platforms,
    background_image,
    genres,
  } = req.body;
  try{
  const videogame = await Videogame.create({
    name,
    description,
    release_date,
    rating,
    background_image,
    platforms
  });

  await videogame.addGenres(genres);
  // await videogame.addPlatforms(platforms)
  res.status(201).send("Game successfully created");
  }
  catch(e){next(e)}
});

module.exports = router;
