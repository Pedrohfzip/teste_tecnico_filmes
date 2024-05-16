const database = require("../services/database");
const HttpStatus = require("http-status-codes");
const getAll = (req, res) => {
  return database.pool
    .query("SELECT * FROM movies")
    .then((results) => {
      return res.status(HttpStatus.OK).json(results);
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
};

module.exports = {
  getAll,
};
