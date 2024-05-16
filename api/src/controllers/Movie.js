const { authCreateMovie } = require("../middleware/CreateMovie");
const database = require("../services/database");
const HttpStatus = require("http-status-codes");

const create = async (req, res) => {
  try {
    const movie = {
      title: req.body.title,
      release_year: req.body.release_year,
      available: req.body.available,
    };

    if (authCreateMovie({ movie }) == false) {
      return res.send(HttpStatus.BAD_REQUEST);
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const result = await database.pool.query(
      "SELECT title, release_year, available FROM movies"
    );
    return res.send(result.rows).json();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAll,
  create,
};
