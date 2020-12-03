const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.create = async(req,res) =>{
	//extraer email y pw
	const{email, username, password} = req.body;
	
	try{
		if(await User.findOne({username})){
			return res.status(400).json({
				msg: 'El nombre de usuario ya se encuentra registrado'
			})
		}

		let user = await User.findOne({email});
		if(user){
			return res.status(400).json({
				msg: 'El email ya se encuentra registrado'
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