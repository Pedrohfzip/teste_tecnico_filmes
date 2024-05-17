const { authCreateMovie } = require("../middleware/CreateMovie");
const database = require("../services/database");
const HttpStatus = require("http-status-codes");
const movies = [];
const create = async (req, res) => {
  const { movie } = req.body; // Novos dados do filme
  console.log(movie);

  if (authCreateMovie({ movie }) == false) {
    return res.send(HttpStatus.BAD_REQUEST);
  }
  try {
    await database.pool
      .query(
        `INSERT INTO movies (title, release_year, available) VALUES ('${movie.title}', '${movie.release_year}', '${movie.available}')`
      )
      .then((movie) => {
        console.log("Adicionado!");
        return movie;
      })
      .catch((e) => console.log("erro na inserção" + e));

    return res.send();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getOne = async (req, res) => {
  try {
    const data = await database.pool.query(
      "SELECT * FROM movies WHERE id = 'ID_DO_MOVIE';"
    );

    const arr = data.rows.map((movie) => {
      return movie;
    });
    console.log(arr);

    return res.send(arr);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getAll = async (req, res) => {
  try {
    const data = await database.pool.query(
      "SELECT id, title, release_year, available FROM movies "
    );
    // console.log(data);
    const arr = data.rows.map((movie) => {
      return movie;
    });

    return res.send(arr);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const { movie } = req.body; // Novos dados do filme
  console.log(movie);
  if (movie.norActor == null) {
    try {
      await database.pool.query(
        `UPDATE movies SET title = $1, release_year = $2, available = $3 WHERE id = $4`,
        [movie.title, movie.release_year, movie.available, movie.id]
      );

      console.log("Filme atualizado com sucesso.");
      return res.status(200).json({ message: "Filme atualizado com sucesso." });
    } catch (error) {
      console.error("Erro ao atualizar filme:", error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }
  if (movie.norActor) {
    try {
      await database.pool.query(
        `INSERT INTO movies_actors (id_movie, id_actor) VALUES ($1, $2);`,
        [movie.id, movie.norActor]
      );

      console.log("Filme atualizado com sucesso.");
      return res.status(200).json({ message: "Filme atualizado com sucesso." });
    } catch (error) {
      console.error("Erro ao atualizar filme:", error);
      return res.status(500).json({ error: "Erro interno do servidor." });
    }
  }
};
const remove = async (req, res) => {
  const { id } = req.params; // ID do filme a ser removido

  try {
    // Verificar se o filme existe
    const existingMovie = await database.pool.query(
      "SELECT * FROM movies WHERE id = $1",
      [id]
    );
    if (existingMovie.rows.length === 0) {
      return res.status(404).json({ error: "Filme não encontrado." });
    }

    // Executar a query de remoção
    await database.pool.query("DELETE FROM movies WHERE id = $1", [id]);

    console.log("Filme removido com sucesso.");
    return res.status(200).json({ message: "Filme removido com sucesso." });
  } catch (error) {
    console.error("Erro ao remover filme:", error);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
};

const getMovieActors = async (req, res) => {
  try {
    const par = req.params;
    const id = par.id;
    console.log(id);
    const data = await database.pool.query(
      ` SELECT a.name FROM movies_actors ma JOIN actors a ON ma.id_actor = a.id WHERE ma.id_movie = $1; `,
      [id]
    );

    const arr = data.rows.map((actor) => {
      return actor;
    });

    console.log(arr);

    return res.send(arr);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
const getActorsNoRelation = async (req, res) => {
  try {
    const par = req.params;
    const id = par.id;
    console.log(id);
    const data = await database.pool.query(
      `SELECT a.id, a.name 
      FROM actors a 
      WHERE a.id NOT IN (
          SELECT ma.id_actor 
          FROM movies_actors ma 
          WHERE ma.id_movie = $1
      ); `,
      [id]
    );

    const arr = data.rows.map((actor) => {
      return actor;
    });

    console.log(arr);

    return res.send(arr);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAll,
  create,
  update,
  remove,
  getMovieActors,
  getActorsNoRelation,
};
