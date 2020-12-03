const {Router} = require('express');
const router = Router();
const authController = require('../controllers/authController');
const {check} = require('express-validator');
const auth = require('../middleware/auth');
const verifyError = require('../middleware/verifyError');

// api/auth

router.post('/',
	[
		check('email', 'Email no válido').isEmail(),
		check('password', 'Contraseña no válida').isLength({min:6})
	],
	verifyError,
	authController.authenticate
	);

/*
	router.post('/twitter' , passport.authenticate('twitter'));

	router.post('/facebook', passport.authenticate('facebook'));
*/

router.get('/',auth, authController.getUser);


module.exports = router;