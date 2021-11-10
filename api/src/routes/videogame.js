const { Videogame , Genre } = require("../db");
const router = require("express").Router();


router.get("/:id", async function (req, res) {
    const { id } = req.params;
    try{const videogame = await Videogame.findByPk(id, {
      include: Genre
    })
    res.json(videogame)} catch(e){
        res.status(500).statusMessage(e);
    }
});


router.post("/", async function (req, res) {
 const { name, description, release_date, rating, plataforms, genres } = req.body;

 const videogame = await Videogame.create({
   name, description, release_date, rating, plataforms
 })
 

 await videogame.addGenres(genres);
 res.sendStatus(200);
 

})

module.exports= router;