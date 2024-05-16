const Router = require("express");
const HttpStatus = require("http-status-codes");
const router = Router();
const userController = require("../controllers/User");

//ROTAS

//Todos os filmes
router.get("/", userController.getAll);

module.exports = router;
