const {Router} = require('express');
const router = Router();
const authController = require('../controllers/authController');
const {check} = require('express-validator');
const auth = require('../middleware/auth');

// api/auth

router.post('/',
	[
		check('email', 'Email no válido').isEmail(),
		check('password', 'Contraseña no válida').isLength({min:6})
	],
	authController.authenticate
	);

router.get('/',auth, authController.getUser);


module.exports = router;