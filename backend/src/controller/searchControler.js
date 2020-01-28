const parseStringAsArray = require("../utils/stringToArray");

module.exports = {
  async index(req, res) {
    //buscar todos os devs em um raio de 10km e que por tecnologia
    const { latitude, longitude, techs } = req.query;

    const techsArray = parseStringAsArray(techs);

    const devs = await Dev.find({
      techs: { $in: techsArray },
      locations: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000
        }
      }
    });

    return res.json({ devs: [devs] });
  }
};
