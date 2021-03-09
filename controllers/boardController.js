const Board = require('../models/Board');
const List = require('../models/List');

exports.create = async(req, res) =>{
	try{
		const board = new Board(req.body);
		board.owner = req.user.id;
		await board.save();
		res.json({board});

	}catch(error){
		console.log(error);
		res.status(500).json({msg: 'No se ha podido crear el tablero'});
	}
}

exports.getBoard = async (req, res) =>{
	try{
		const board = await Board.findById(req.params.id);
		if(!board){
			res.status(400).json({msg:'El tablero no existe'});
		}
		const lists = await List.find({board: req.params.id})
		board.lists = lists;
		res.status(200).json({board});
		
	
	}catch(error){
		res.status(500).json({msg:'No se pudo recuperar el tablero'});
	}
}

/*mejorar esto*/
exports.getBoards = async (req, res) =>{
	try{
		const boards = await Board.find({owner: req.user.id}).sort({owner: -1});
		res.status(200).json({boards});
	}catch(error){
		console.log(error);
		res.status(500).json({msg:'No se pudieron recuperar los tableros'});
	}
}

exports.delete = async (req, res) =>{
	try{
		const {id} = req.params;

		let board = await Board.findById(id);

		if(!board){
			return res.status(404).json({msg: 'El tablero no fue encontrado'});
		}

		if(board.owner.toString() !== req.user.id){
			return res.status(401).json({msg: "No autorizado"});
		}

		//borrar todas las listas de este tablero:
		const lists = await List.find({board: id});
		await lists.forEach( async list => {
			await List.findByIdAndRemove(list.id);
		})

		await Board.findOneAndRemove({_id : id});


		res.status(200).json({msg: 'Tablero eliminado'});
		
	}catch(error){
		console.log(error);
		res.status(500).json({msg:'No se pudo eliminar el tablero'});
	}
}

exports.update = async(req,res) =>{
	//informacion
	const newBoard = {
		name: req.body.name
	}
	try{
		let board = await Board.findById(req.params.id);
		//Ver si el tablero existe
		/*El unico sentido que veo a esto es que inventen un id y lo pasen por url*/
		if(!board){
			res.status(404).json({msg: 'Tablero no encontrado'});
		}
		//ver si es el dueño del tablero
		if(board.owner.toString() !== req.user.id){
			res.status(401).json({msg: 'Usted no puede modificar este Tablero'});
		}	

		//Actualizar
		board = await Board.findByIdAndUpdate({_id: req.params.id},{$set:
			newBoard},{new: true});

		res.status(200).json({msg: 'Tablero actualizado correctamente'});

	}catch(error){
		console.log(error);
		res.status(500).json({msg:'Error en el servidor'});
	}
	
}