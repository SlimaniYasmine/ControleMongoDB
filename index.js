const express = require ('express');
const { connecter } = require('./bd/connect');
const app= express();
const routeContact = require("./routes/contact")
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use("/api/c1",routeContact);
connecter("mongodb://127.0.0.1:27017");
app.listen(8000);
console.log("attend la requete au port 8000");
