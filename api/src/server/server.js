const express = require("express");
const dotenv = require("dotenv");
const router = require("../routes/index");
const server = express();
server.use(express.json());
dotenv.config();
server.use(router);

module.exports = server;
