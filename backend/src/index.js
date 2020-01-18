const express = require('express');

const mongoose = require('mongoose');

const app = express();

const routes = require('./routes')

mongoose.connect('mongodb://localhost:27017/devradar', {
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
});

app.use(express.json());

app.use(routes);

app.listen(3333);
