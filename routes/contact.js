const express = require("express");
const { ajouterContact } = require("../Controller/Contact");
const Router = express.Router();
Router.route("/contacts").post(ajouterContact);
module.exports = Router;