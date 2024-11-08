const express = require("express");
const app = express();
const routes = require("./router/index")
const { db } = require("../db/connection");

app.use(express.json());   
app.use("/", routes);


module.exports = app;
