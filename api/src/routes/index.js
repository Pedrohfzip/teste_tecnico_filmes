const Router = require("express");
const HttpStatus = require("http-status-codes");
const router = Router();
const movieController = require("../controllers/Movie");

//ROTAS

//Todos os filmes
router.get("/", movieController.getAll);
router.post("/movie", movieController.create);

module.exports = router;
