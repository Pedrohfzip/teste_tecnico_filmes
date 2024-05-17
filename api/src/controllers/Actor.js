const database = require("../services/database");
const HttpStatus = require("http-status-codes");
const authCreateActor = require("../middleware/CreateActor");

const create = async (req, res) => {
  let { actor } = req.body;
  let date_birth = new Date(actor.date_birth);
  if (actor.date_birth == null) {
    return false;
  }
  console.log(actor);
  try {
    await database.pool
      .query(
        `INSERT INTO actors (name, date_birth, nationality) VALUES ($1, $2, $3)`,
        [actor.name, date_birth, actor.nationality]
      )
      .then((actor) => {
        console.log("Adicionado!");
        return actor;
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

    return res.send(arr);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const { actor } = req.body; // Novos dados do filme
  const date = new Date(actor.date_birth);
  const name = actor.name;
  date.toLocaleDateString("pt-BR");
  console.log(actor.date_birth);
  try {
    await database.pool.query(
      `UPDATE actors SET name = $1, date_birth = $2, nationality = $3 WHERE id = $4`,
      [actor.name, date, actor.nationality, actor.id]
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
      "SELECT * FROM actors WHERE id = $1",
      [id]
    );
    if (existingMovie.rows.length === 0) {
      return res.status(404).json({ error: "Filme não encontrado." });
    }

    // Executar a query de remoção
    await database.pool.query("DELETE FROM actors WHERE id = $1", [id]);

    console.log("Ator removido com sucesso.");
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
