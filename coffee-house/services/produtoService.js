const pool = require('../db/connection');

async function listarProdutos(categoria, pagina = 1, limite = 2) {
  const offset = (pagina - 1) * limite;

  let query = 'SELECT * FROM produtos';
  let countQuery = 'SELECT COUNT(*) FROM produtos';
  const params = [];

  if (categoria) {
    query += ' WHERE categoria = $1';
    countQuery += ' WHERE categoria = $1';
    params.push(categoria);
  }

  query += ` ORDER BY id LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;

  const produtos = await pool.query(query, [...params, limite, offset]);
  const total = await pool.query(countQuery, params);

  return {
    produtos: produtos.rows,
    total: Number(total.rows[0].count),
    pagina,
    limite
  };
}

module.exports = {
  listarProdutos
};