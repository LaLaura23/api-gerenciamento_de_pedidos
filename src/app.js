const express = require('express');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    mensagem: 'API de Gerenciamento de Pedidos',
    versao: '1.0.0'
  });
});

module.exports = app;
