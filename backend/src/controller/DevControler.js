//const { Router } = require("express");

//Criar UPDATE e DESTROY no mesmo esquema que estou fazendo aqui...
const axios = require("axios");
const dev = require("../model/dev");
const parseStringAsArray = require("../utils/stringToArray");
module.exports = {
  async index(req, res) {
    const devs = await dev.find();

    return res.json(devs);
  },

  async store(req, res) {
    //console.log(req.body);
    const { github_username, techs, latitude, longitude } = req.body;

    const devFound = await dev.findOne({ github_username });

    if (!devFound) {
      const response = await axios.get(
        `https://api.github.com/users/${github_username}`
      );
      //console.log(response.data);
      const { name = login, avatar_url, bio } = response.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: "Point", // POINT PRECISA SER MAIUSCULO PRA FUNCIONAR
        coordinates: [longitude, latitude]
      };

      const devCad = await dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });
    }
    //console.log(github);

    return res.json(devCad);
  }
};
