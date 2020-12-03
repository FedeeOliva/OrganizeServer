const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const router = require('./routes');

const app = express();

app.use(cors());

connectDB();
const Port = process.env.Port || 4000;

app.use(router);

app.listen(Port, () =>{
	console.log(`Servidor funcionando en http://localhost:${Port}`);
})