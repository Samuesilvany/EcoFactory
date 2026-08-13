const pool = require('../db/connection');

async function criarAvaliacao(produtoId, nota, comentario) {
  const result = await pool.query(
    `
    INSERT INTO avaliacoes (produto_id, nota, comentario)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [produtoId, nota, comentario]
  );

  return result.rows[0];
}

module.exports = {
  criarAvaliacao
};