const { Platform } = require("../db");
const router = require("express").Router();
const { API_KEY } = process.env;
const axios = require("axios").default;

//////////////////////////////////////End Point API//////////////////////////////////////////////
//  https://api.rawg.io/api/platforms

///////////////////////////////////////Routes/////////////////////////////////////////////////
router.get("/", async function (req, res) {
  axios
    .get(`https://api.rawg.io/api/platforms?key=${API_KEY}`)
    .then((response) => {
      const platforms = response.data.results.map((platform) => ({
        id:platform.id,
        name: platform.name,
        image_background: platform.image_background,
      }));
      return Promise.all(
        platforms.map((platforms) =>
          Platform.findOrCreate({
            where: { id:platforms.id, },
            defaults: { name: platforms.name,image_background: platforms.image_background },
          })
        )
      );
    })
    .then(() => {
      return Platform.findAll();
    })
    .then((response) => {
      res.json(response);
    })
    .catch((e) => {console.log(e);res.status(500).send("Error")});
});

module.exports = router;
