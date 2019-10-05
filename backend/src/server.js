const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);


// Acessar MongoDB Atlas
mongoose.connect('mongodb+srv://omnistack:omnistack@omnistack-mlbcv.mongodb.net/proj-omn09?retryWrites=true&w=majority', {
   useNewUrlParser: true,
   useUnifiedTopology: true,
})

// Se for usar uma aplicação em produção, utilizar Redis 
const connectedUsers = {};

io.on('connection', socket => {
   const { user_id } = socket.handshake.query;

   connectedUsers[user_id] = socket.id;

   /*setTimeout(() => {
      socket.emit('hello', 'Wolrd'); // enviando para o frontend
   }, 4000) // demora 4s  
   socket.on('omni', data => {
      console.log(data);  // recebendo do frontend
   })*/
});

app.use((req , res, next) => {
   req.io = io;
   req.connectedUsers = connectedUsers;

   return next(); // continuar a aplicação, senão aplicação fica nessa função
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

server.listen(3333);