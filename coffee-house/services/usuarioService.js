const pool = require('../db/connection');

async function login(nome, senha) {
  const result = await pool.query(
    `
    SELECT id, nome
    FROM usuarios
    WHERE nome = $1 AND senha = $2
    `,
    [nome, senha]
  );

  return result.rows[0];
}

module.exports = {
  login
};