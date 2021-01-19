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
		await Board.findByIdAndUpdate({_id: idBoard},{$set:
			newBoard},{new: true});

		res.status(200).json({msg: "Lista creada correctamente"});
	}
	catch(error){
		console.log(error);
		res.status(500).json({msg: 'Hubo un error al crear la lista'});
	}

}

exports.delete = async (req, res) =>{
	try{
		const {idBoard, idList} = req.query;
		let board = await Board.findById(idBoard);
		//verificar si el proyecto existe
		if(!board){
			res.status(404).json({msg: 'Tablero no encontrado'});
		}
		//verificar si es el dueño
		if(board.owner.toString() !== req.user.id){
			res.status(401).json({msg: 'Usted no puede eliminar listas en este Tablero'});
		}
		board.lists = board.lists.filter( el => el._id !== idList);
		
		await Board.findByIdAndUpdate({_id: idBoard},{$set:
			board},{new: true});

		res.status(200).json({msg: 'La lista ha sido eliminada'});

	}catch(error){
		console.log(error);
		res.status(500).json({msg: 'Hubo un error al eliminar la lista'});
	}
}

//Recibe una lista y actualiza
exports.update = async (req, res) =>{
	try{
		const {idBoard} = req.query;
		const {list} = req.body;
		let board = await Board.findById(idBoard);
		//verificar si el proyecto existe
		if(!board){
			res.status(404).json({msg: 'Tablero no encontrado'});
		}
		//verificar si es el dueño
		if(board.owner.toString() !== req.user.id){
			res.status(401).json({msg: 'Usted no puede actualizar listas en este Tablero'});
		}
		//Remplazo 
		const oldListIndex = board.lists.findIndex( el => el._id === list._id);
		board.lists[oldListIndex] = list;
		
		await Board.findByIdAndUpdate({_id: idBoard},{$set:
			board},{new: true});

		res.status(200).json({msg: 'La lista ha sido actualizada'});

	}catch(error){
		console.log(error);
		res.status(500).json({msg: 'Hubo un error al actualizar la lista'});
	}
}