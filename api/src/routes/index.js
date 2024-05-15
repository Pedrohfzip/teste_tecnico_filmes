const Router = require("express");
const HttpStatus = require("http-status-codes");
const router = Router();

router.get("/", (req, res) => {
  console.log(HttpStatus.OK);
  return res.send("Ola");
});

module.exports = router;
