const List = require('../models/List');
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
		list.board = idBoard;

		//insertarla en el tablero
		await list.save();


		res.status(200).json({list});
	}
	catch(error){
		console.log(error);
		res.status(500).json({msg: 'Hubo un error al crear la lista'});
	}

}

exports.delete = async (req, res) =>{
	try{
		const {id} = req.params;
		const list = await List.findById(id);

		if(!list){
			return res.status(404).json({msg: 'La lista no existe'});
		}

		const board = await Board.findById(list.board);
		if(board.owner.toString() !== req.user.id){
			return res.status(401).json({msg: 'No autorizado'});
		}

		await List.findByIdAndRemove(id);
		res.status(200).json({msg: 'La lista ha sido eliminada'});

	}catch(error){
		console.log(error);
		res.status(500).json({msg: 'Hubo un error al eliminar la lista'});
	}
}

//Recibe una lista y actualiza
exports.update = async (req, res) =>{
	try{		
		const {list} = req.body;

		let board = await Board.findById(list.board);

		//verificar si el proyecto existe
		if(!board){
			res.status(404).json({msg: 'Tablero no encontrado'});
		}
		//verificar si es el dueño
		if(board.owner.toString() !== req.user.id){
			res.status(401).json({msg: 'Usted no puede actualizar listas en este Tablero'});
		}	
		
		await List.findByIdAndUpdate({_id: list._id}, {$set: list});

		res.status(200).json({msg: 'La lista ha sido actualizada'});

	}catch(error){
		console.log(error);
		res.status(500).json({msg: 'Hubo un error al actualizar la lista'});
	}
}