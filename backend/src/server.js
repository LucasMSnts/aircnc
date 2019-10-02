const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const routes = require('./routes');


const app = express();

// Acessar MongoDB Atlas
mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-mlbcv.mongodb.net/proj-omn09?retryWrites=true&w=majority', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
})

// GET, POST, PUT, DELETE

// req.query = Acessar query params (para filtros)
// req.params = Acessar route params (para edição, delete)
// req.body = Acessar corpo da requisição (para criação, edição)

app.use(cors()); // exemplo: cors({ origin: 'http://localhost:3333})
app.use(express.json());
// Pegar os arquivos do 'servidor'
// __dirname = onde se localiza o arquivo (no caso, models/server.js)
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads'))); 
app.use(routes);

app.listen(3333);