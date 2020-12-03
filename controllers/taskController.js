const Board = require('../models/Board');
const {Task} = require('../models/Task');
const {List} = require('../models/List');


exports.create = async (req, res) =>{
	try{
		console.log('entrando peticion');
		const {idBoard, idList} = req.query;
		//Ver si el tablero existe y es el dueño
		let board = await Board.findById(idBoard);
		if(!board){
			res.status(404).json({msg: 'Tablero no encontrado'});
		}
		//Ver si la lista existe en el tablero y sacar el indice
		const indexList = board.lists.findIndex(list => list._id.toString() === idList );
		
		if(indexList === -1){
			res.status(404).json({msg: 'Lista no encontrada'});
		}		
		//crear la tarea
		const task = new Task(req.body);
		//añadir la tarea a la lista
		board.lists[indexList].tasks.push(task);

		board = await Board.findByIdAndUpdate({_id: idBoard},{$set:
			board},{new: true});

		res.status(200).json({newBoard: board});
	}catch(error){
		console.log(error);
		res.status(500).json({msg: 'Hubo un error con la trea'})
	}
}