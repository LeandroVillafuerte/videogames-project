const { Router } = require('express');
const videogames = require('./videogames.js')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/videogames',videogames)
// app.use('/', index);
// app.use('/pages', pages);
// app.use('/users', users);
// app.use('/categories', categories);


module.exports = router;
