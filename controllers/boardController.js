const Board = require('../models/Board');
const { validationResult } = require('express-validator');

exports.create = async(req, res) =>{
	//Revisar si hay errores (Ver de poner esta parte en un middleware)
	const errores = validationResult(req);
	if(!errores.isEmpty()){
		return res.status(400).json({errores: errores.array()})
	}

	try{
		const board = new Board(req.body);

		board.owner = req.user.id;
		await board.save();
		res.json(board);

	}catch(error){
		console.log(error);
		res.status(500).send('No se ha podido crear el proyecto');
	}
}

exports.getBoards = async (req, res) =>{
	try{
		const boards = await Board.find({owner: req.user.id}).sort({owner: -1});
		res.json({boards});
	}catch(error){
		console.log(error);
		res.status(500).send('No se pudieron recuperar los tableros');
	}
}

exports.delete = async (req, res) =>{
	try{
		let board = await Board.findById(req.params.id);

		if(!board){
			return res.status(404).json({msg: 'El tablero no fue encontrado'});
		}

		if(board.owner.toString() !== req.user.id){
			return res.status(401).json({msg: "No autorizado"});
		}
		await Board.findOneAndRemove({_id : req.params.id});


		res.json({msg: 'Tablero eliminado'});
		
	}catch(error){
		console.log(error);
		res.status(500).send('No se pudo eliminar el tablero');
	}
}

exports.update = async(req,res) =>{
	
}