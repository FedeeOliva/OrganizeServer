const {Router} = require('express');
const router = Router();
const userController = require('../controllers/userController');
const {check} = require('express-validator');

//api/users
router.post('/', 
	[
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		check('email', 'Agrega un email válido').isEmail(),
		check('lastname', 'El apellido es obligatorio').not().isEmpty(),
		check('password', 'El password debe ser minimo de 6 careactares').isLength({min:6})
	],
	userController.create
	);

module.exports = router;
