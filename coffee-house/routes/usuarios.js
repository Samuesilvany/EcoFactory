const express = require('express');
const router = express.Router();
const usuarioService = require('../services/usuarioService');

router.post('/login', async (req, res) => {
  try {
    const { nome, senha } = req.body;

    if (!nome || !senha) {
      return res.status(400).json({ erro: 'Nome e senha são obrigatórios' });
    }

    const usuario = await usuarioService.login(nome, senha);

    if (!usuario) {
      return res.status(401).json({ erro: 'Nome ou senha inválidos' });
    }

    res.json({
      mensagem: 'Login realizado com sucesso',
      usuario
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: 'Erro ao realizar login' });
  }
});

module.exports = router;