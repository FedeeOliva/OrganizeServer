const Board = require('../models/Board');
const {Task} = require('../models/Task');
const List = require('../models/List');


exports.create = async (req, res) =>{
	try{
		const {idList} = req.query;		
		//Ver si la lista existe en el tablero y sacar el indice
		const list = await List.findById(idList);
		if(!list){
			res.status(404).json({msg: 'Lista no encontrada'});
		}

		//crear la tarea
		const task = new Task(req.body);
		//añadir la tarea a la lista
		list.tasks.push(task);

		await List.findByIdAndUpdate({_id: idList},{$set:
			list },{new: true});

		res.status(200).json({msg: "Tarea creada"});
	}catch(error){
		console.log(error);
		res.status(500).json({msg: 'Hubo un error con la tarea'})
	}
}