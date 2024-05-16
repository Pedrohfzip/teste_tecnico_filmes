const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "123",
  port: "5432",
  database: "dev",
});

module.exports = {
  pool,
};
