const Router = require("express");
const HttpStatus = require("http-status-codes");
const router = Router();
const movieController = require("../controllers/Movie");
const actorController = require("../controllers/Actor");

//ROTAS

//Todos os filmes
router.get("/", movieController.getAll);
router.post("/movie", movieController.create);
router.put("/movie/:id", movieController.update);
router.delete("/movie/:id", movieController.remove);

router.get("/actors", actorController.getAll);
router.put("/actors/:id", actorController.update);

module.exports = router;
