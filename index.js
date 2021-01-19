const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const router = require('./routes');

const app = express();

app.use(cors());

connectDB();
const port = process.env.PORT || 4000;
const host = process.env.HOST || '0.0.0.0'

app.use(router);

app.listen(port, host, () =>{
	console.log(`Servidor funcionando en ${port}`);
})