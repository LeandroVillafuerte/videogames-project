const { Genre } = require("../db");
const router = require("express").Router();
const { API_KEY } = process.env;
const axios = require("axios").default;

//////////////////////////////////////End Point API//////////////////////////////////////////////
//  https://api.rawg.io/api/genres

///////////////////////////////////////Routes/////////////////////////////////////////////////
router.get("/", async function (req, res) {
  axios
    .get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    .then((response) => {
      const genres = response.data.results.map((genre) => ({
        genre_name: genre.name,
        url_img: genre.image_background,
      }));
      return Promise.all(
        genres.map((genres) =>
          Genre.findOrCreate({
            where: { genre_name: genres.genre_name },
            defaults: { url_img: genres.url_img },
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
    .catch(() => res.status(500).send("Internal Error"));
});

module.exports = router;
