const pool = require('../db/connection');

async function listarPedidos() {
  const result = await pool.query(`
    SELECT 
      pedidos.id,
      pedidos.quantidade,
      produtos.nome,
      produtos.preco,
      produtos.tempo_preparo,
      produtos.emoji,
      produtos.categoria,
      pedidos.data_pedido
    FROM pedidos
    INNER JOIN produtos ON produtos.id = pedidos.produto_id
    ORDER BY pedidos.id DESC
  `);

  return result.rows;
}

async function resumoPedidos() {
  const result = await pool.query(`
    SELECT 
      COUNT(pedidos.id) AS total_pedidos,
      COALESCE(SUM(produtos.preco * pedidos.quantidade), 0) AS total_valor
    FROM pedidos
    INNER JOIN produtos ON produtos.id = pedidos.produto_id
  `);

  return result.rows[0];
}

async function criarPedido(produtoId, quantidade) {
  const result = await pool.query(
    `
    INSERT INTO pedidos (produto_id, quantidade)
    VALUES ($1, $2)
    RETURNING *
    `,
    [produtoId, quantidade]
  );

  return result.rows[0];
}

async function deletarPedido(id) {
  await pool.query('DELETE FROM pedidos WHERE id = $1', [id]);
}

module.exports = {
  listarPedidos,
  resumoPedidos,
  criarPedido,
  deletarPedido
};

