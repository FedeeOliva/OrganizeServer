const express = require('express');
/*const bodyParser = require('body-parser');*/
const router = express.Router();

router.use(express.json({extended: true }));


router.get('/', (req, res) =>{
	res.send('Hello World los amo!');
})

//Cuando se haga peticion a una de estas rutas, se usara las correspondientes

//crear usuarios
router.use('/api/users', require('./users'));

//autenticar usuarios
router.use('/api/auth', require('./auth'));

//tableros
router.use('/api/boards', require('./boards'));


module.exports = router;