// server/index.js
const { TextEncoder, TextDecoder } = require("util");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;

const app = express();

//
const DATA2 = [
  {
	key: 'aaa',
    nome: 'Arthur:',
    qtd_mofo: 'NENHUMA',
  },
  {
	key: 'aab',
    nome: 'Camila',
    qtd_mofo: 'NENHUMA',
  },
  {
	key: 'aac',
    nome: 'Daniel',
    qtd_mofo: 'NENHUMA',
  },
  {
	key: 'Nina',
    nome: 'Pulmões do Willem Dafoe',
    qtd_mofo: 'NENHUMA',
  },
];
const data_Schema = new mongoose.Schema({
	key: String,
	nome: {
		type: String,
		required: true
	},
	qtd_mofo: String
});
const Data = mongoose.model('Data', data_Schema);

mongoose.connect("mongodb://admin:admin@localhost:27017/example");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
	console.log("Connected to database successfully");
	//Data.insertMany(DATA2, (err) => {if (err) console.log("Error inserting DATA2")});
});


app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


//Para testar: curl localhost:3001
app.get('/', async (req,res) => {
  res.json(await Data.find());
});

//Para testar: curl localhost:3001/Camila
app.get('/:nome', async (req,res) => {
  res.json(await Data.findOne({nome: req.params.nome}));
});

//Para testar: curl -X POST -H "Content-Type: application/json" -d '{"key":"key_joao","nome":"joao", "qtd_mofo":"razoável"}' localhost:3001
app.post('/', async (req,res) => {
	res.json(await Data.create(req.body));
});

module.export = app