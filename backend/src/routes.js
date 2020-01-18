const { Router } = require('express')
const DevController = require('./controllers/DevController')
const SearchConstroller = require('./controllers/SearchConstroller')

const routes = Router();


routes.post('/devs', DevController.store);
routes.get('/devs', DevController.index);
routes.get('/search', SearchConstroller.index);

module.exports = routes;
