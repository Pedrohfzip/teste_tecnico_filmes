const express = require("express");
const dotenv = require("dotenv");
const router = require("../routes/index");
const server = express();
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3001",
};

server.use(express.json());
server.use(cors(corsOptions));
dotenv.config();
server.use(router);

module.exports = server;
