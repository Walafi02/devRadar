const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const routes = require('./routes');
const {setupWebsocket} = require('./webSocket');

const app = express();
const server = http.Server(app);

setupWebsocket(server);

mongoose.connect('mongodb://localhost:27017/devradar', {
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
});

app.use(cors({origin: 'http://localhost:3000'}));
app.use(express.json());
app.use(routes);

server.listen(3333);
