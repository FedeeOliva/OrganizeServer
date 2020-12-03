const {List} = require('../models/List');
const Board = require('../models/Board');

//crearia la lista y seria como actualizar el tablero
exports.create = async (req, res) =>{

	try{
		const {idBoard} = req.query;
		//verificar si el proyecto existe
		let board = await Board.findById(idBoard);
		if(!board){
			res.status(404).json({msg: 'Tablero no encontrado'});
		}
		//verificar si es el dueño
		if(board.owner.toString() !== req.user.id){
			res.status(401).json({msg: 'Usted no puede agregar listas en este Tablero'});
		}	
		//Crear la tarea
		const list = new List(req.body);
		let newBoard = {
			lists: [...board.lists, list]
		}

		//insertarla en el tablero
		newBoard = await Board.findByIdAndUpdate({_id: idBoard},{$set:
			newBoard},{new: true});

		res.status(200).json({newBoard});
	}
	catch(error){
		console.log(error);
		res.status(500).json({msg: 'Hubo un error'});
	}

}
