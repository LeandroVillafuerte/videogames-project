const { Genre } = require("../db");
const router = require("express").Router();
const { API_KEY } = process.env;
const axios = require("axios").default;

//////////////////////////////////////End Point API//////////////////////////////////////////////
//  https://api.rawg.io/api/genres

///////////////////////////////////////Routes/////////////////////////////////////////////////
router.get("/", async function (req, res,next) {
  axios
    .get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    .then((response) => {
      const genres = response.data.results.map((genre) => ({
        id:genre.id,
        name: genre.name,
        image_background: genre.image_background,
      }));
      return Promise.all(
        genres.map((genres) =>
          Genre.findOrCreate({
            where: { id:genres.id, },
            defaults: { name: genres.name,image_background: genres.image_background },
          })
        )
      );
    })
    .then(() => {
      return Genre.findAll();
    })
    .then((response) => {
      res.json(response);
    })
    .catch((next));
});

module.exports = router;
