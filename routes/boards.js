const {Router} = require('express');
const router = Router();
const boardController = require('../controllers/boardController');
const {check} = require('express-validator');
const auth = require('../middleware/auth');
const verifyError = require('../middleware/verifyError');

//  /api/boards

//Crear proyecto
router.post('/', 
	auth,
	[
		check('name', 'El nombre no puede estar vacio').not().isEmpty(),
		check('imageID', 'No se seleccionó una imagen').not().isEmpty(),
	],
	verifyError,
	boardController.create
	);

//Obtener Tableros
router.get('/',
	auth,
	boardController.getBoards
	)

//Obtener tablero
router.get('/:id',
	auth,
	boardController.getBoard
	)
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
		verifyError,
		boardController.update
	);

module.exports = router;
