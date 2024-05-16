const Router = require("express");
const HttpStatus = require("http-status-codes");
const router = Router();
const userController = require("../controllers/Movie");

//ROTAS

//Todos os filmes
router.get("/", userController.getAll);
router.post("/movie", userController.create);

module.exports = router;
