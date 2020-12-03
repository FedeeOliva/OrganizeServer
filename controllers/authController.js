const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authenticate = async (req ,res) =>{
	
	const {email, password} = req.body;
	
	try{
		let user = await User.findOne({email});
		if(!user){
			return res.status(400).json({msg:'El usuario ingrasado no existe'});

		}
		const verifyPass = await bcryptjs.compare(password, user.password);
		if(!verifyPass){
			return  res.status(400).json({msg: 'La contraseña es incorrecta'});
		}

		const payload = {
			user: {
				id: user._id
			}
		};

		//firmar el jwt
		jwt.sign(payload, process.env.SECRETA,{
			expiresIn: 36000 //expira en una hora (3600 segundos)
		}, (error, token) =>{
			if(error) throw error;

			//mensaje de confirmacion
			res.json({token}); //cuando llave y valor son igual (token : token), se peude retornar solo 1

		});


	}catch(error){
		console.log(error);
		return res.status(400).json({msg: 'Error al iniciar sesion'});
	}

}

exports.getUser = async (req, res) =>{
	//el req.user viene del jwt que escribe el middleware auth
	try{
		const user = await User.findById(req.user.id).select('username');
		res.json({user});
	}catch(error){
		console.log(error);
		res.status(500).json({msg: 'Hubo un error'});
	}
}