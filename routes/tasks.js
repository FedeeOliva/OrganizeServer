const {Router} = require('express');
const router = Router();
const taskController = require('../controllers/taskController');
const {check} = require('express-validator');
const auth = require('../middleware/auth');
const verifyError = require('../middleware/verifyError');


//  api/tasks
router.post('/', 
		auth,
		[
			check('name', 'La tarea debe tener un nombre')
		],
		verifyError,
		taskController.create
	);

module.exports = router;