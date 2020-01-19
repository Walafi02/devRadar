const axios = require('axios')
const Dev = require('../models/Dev');

const { findConnections, sendMessage } = require('../webSocket');

const parseStringToArray = require('../utils/parseStringToArray')
module.exports = {
  async index(req, res) {
    const devs = await Dev.find();

    return res.json(devs);
  },

  async store(req, res) {

    const { github_username, techs, longitude, latitude } = req.body;


    const username = github_username.toLowerCase();

    let dev = await Dev.findOne({ github_username: username })
    if (!dev) {

      const { data } = await axios.get(`https://api.github.com/users/${github_username}`);

      const { name = login, avatar_url, bio } = data;

      const techsArray = parseStringToArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      }

      dev = await Dev.create({ name, avatar_url, bio, github_username: username, techs: techsArray, location });

      const sendSocketMessageTo = findConnections(
        {latitude, longitude},
        techsArray
      );

      sendMessage(sendSocketMessageTo, 'new-dev', dev);
    }

    return res.json(dev)
  }
}
