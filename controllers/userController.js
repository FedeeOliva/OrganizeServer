const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.create = async(req,res) =>{
	//Revisar si hay errores que vengan del check
	const errores = validationResult(req);
	if(!errores.isEmpty()){
		return res.status(400).json({errores: errores.array()})
	}
	//extraer email y pw
	const{email, password} = req.body;
	
	try{
		let user = await User.findOne({email});
		if(user){
			return res.status(400).json({
				msg: 'El usuario ya existe'
			})
		}

		//Crear nuevo usuario
		user = new User(req.body);

		//Hashear el pw
		const salt = await bcryptjs.genSalt(10);
		user.password = await bcryptjs.hash(password,salt);

		//guardar el nuevo usuario
		await user.save();

		//Crear y firmar el JWT
		const payload = {
			user: {
				id: user.id
			}
		};

		//firmar el jwt
		jwt.sign(payload, process.env.SECRETA,{
			expiresIn: 3600 //expira en una hora (3600 segundos)
		}, (error, token) =>{
			if(error) throw error;

			//mensaje de confirmacion
			res.json({token}); //cuando llave y valor son igual (token : token), se peude retornar solo 1

		});
	
	}catch(error){
		console.log(error);
		res.status(400).send('Hubo un error al crear el usuario');
	}

	
}