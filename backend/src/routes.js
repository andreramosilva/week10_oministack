const { Router } = require("express");
const axios = require("axios");
const dev = require("./model/dev");

const devControler = require("./controller/DevControler");
const searchControler = require("./controller/searchControler");

const routes = Router();

routes.get("/devs", devControler.index);
routes.get("/search", searchControler.index);

routes.post("/devs", devControler.store);

module.exports = routes;
