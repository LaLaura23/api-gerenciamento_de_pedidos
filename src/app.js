const express = require('express');
const pedidoRoutes = require('./routes/pedidoRoutes');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json({
    mensagem: 'API de Gerenciamento de Pedidos',
    versao: '1.0.0'
  });
});

app.use('/pedidos', pedidoRoutes);

app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada.' });
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      erro: 'JSON inválido. Verifique o corpo da requisição.'
    });
  }
  console.error(err);
  return res.status(500).json({ erro: 'Erro interno do servidor.' });
});

module.exports = app;
