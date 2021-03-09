const {Router} = require('express');
const router = Router();
const listController = require('../controllers/listController');
const {check} = require('express-validator');
const auth = require('../middleware/auth');
const verifyError = require('../middleware/verifyError');

// api/lists
//Crear listas  query: idBoard
router.post('/',
	auth,[
		check('name','El nombre de la lista no puede estar vacio').not().isEmpty()
	],
	verifyError,
	listController.create
);

module.exports = router;

//Eliminar una lista
router.delete('/:id', 
	auth,
	listController.delete
	)

router.put('/', 
	auth,
	[
		check('list', 'No se ha recibido la lista ha actualizar').not().isEmpty()

	],
	verifyError,
	listController.update
	)