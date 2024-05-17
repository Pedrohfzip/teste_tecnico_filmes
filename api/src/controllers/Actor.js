const database = require("../services/database");
const HttpStatus = require("http-status-codes");
const create = async (req, res) => {
  const movie = {
    title: req.body.title,
    release_year: req.body.release_year,
    available: req.body.available,
  };

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
    const data = await database.pool.query(`SELECT * FROM actors WHERE id = `);

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
      "SELECT id, name, date_birth, nationality FROM actors "
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

const update = async (req, res) => {
  const { actor } = req.body; // Novos dados do filme

  console.log(actor.date_birth);
  try {
    await database.pool.query(
      `UPDATE actors SET name = $1, date_birth = $2, nationality = $3 WHERE id = $4`,
      [actor.name, actor.date_birth, actor.nationality, actor.id]
    );

    console.log("Ator atualizado com sucesso.");
    return res.status(200).json({ message: "Filme atualizado com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar filme:", error);
    return res.status(500).json({ error: "Erro interno do servidor." });
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

module.exports = {
  getAll,
  create,
  update,
  remove,
};
