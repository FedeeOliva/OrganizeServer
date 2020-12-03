const {Router} = require('express');
const router = Router();
const userController = require('../controllers/userController');
const {check} = require('express-validator');
const verifyError = require('../middleware/verifyError');

//api/users
router.post('/', 
	[
		check('username', 'El nombre es obligatorio').not().isEmpty(),
		check('email', 'Agrega un email válido').isEmail(),
		check('password', 'El password debe ser minimo de 6 careactares').isLength({min:6})
	],
	verifyError,
	userController.create
	);

module.exports = router;
