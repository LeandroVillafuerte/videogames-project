const { Videogame } = require('../db')
const router = require('express').Router();


router.get('/', async function(req, res) {

    const name = req.query.name

    if(name){
    const { rows } = await Videogame.findAndCountAll({
        where:{
            name : `%${name}%`
        },
        limit:15
    });
    res.json(rows)

    }else{
    
    try{
    const videogames = await Videogame.findAll();
    res.json(videogames);
     } catch(e){
         res.status(500).statusMessage(e)
     }
    }
  });


module.exports = router;