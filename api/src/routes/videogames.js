const { Videogame } = require("../db");
const { Op } = require("sequelize");
const router = require("express").Router();

router.get("/", async function (req, res) {
  const name = req.query.name;

  try {
  if (name) {
    const videogameslist = await Videogame.findAll({
      where: { name: {[Op.iLike]: `%${name}%`}},
      limit: 15,
    });
    res.status(201).json(videogameslist);
  } else {
      const videogames = await Videogame.findAll();
      res.json(videogames);
    }
  } catch(e){
    res.status(500).send(e);
  }
  });


  

module.exports = router;
