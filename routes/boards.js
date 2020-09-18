const {Router} = require('express');
const router = Router();
const boardController = require('../controllers/boardController');
const {check} = require('express-validator');
const auth = require('../middleware/auth');

//  /api/boards

//Crear proyecto
router.post('/', 
	auth,
	[
		check('name', 'El nombre no puede estar vacio').not().isEmpty()
	],
	boardController.create
	);

//Obtener Tableros
router.get('/',
	auth,
	boardController.getBoards
	)
module.exports = router;

//Eliminar Tablero

router.delete('/:id',
	auth,
	boardController.delete
	);

//modificar

router.put('/:id',
		auth,[
			check('name', 'El nombre no puede estar vacio').not().isEmpty()
		],
		boardController.update
	);