
const service = require('../services/pedidoService');

function tratarErro(res, erro) {
  if (erro.tipo === 'VALIDACAO') {
    return res.status(400).json({ erro: erro.message });
  }

  if (erro.tipo === 'NAO_ENCONTRADO') {
    return res.status(404).json({ erro: erro.message });
  }

  console.error(erro);
  return res.status(500).json({ erro: 'Erro interno do servidor.' });
}

exports.criar = (req, res) => {
  try {
    const pedido = service.criarPedido(req.body);
    return res.status(201).json(pedido);
  } catch (erro) {
    return tratarErro(res, erro);
  }
};

exports.listar = (req, res) => {
  try {
    return res.status(200).json(service.listarPedidos());
  } catch (erro) {
    return tratarErro(res, erro);
  }
};

exports.buscarPorId = (req, res) => {
  try {
    return res.status(200).json(service.buscarPedidoPorId(req.params.id));
  } catch (erro) {
    return tratarErro(res, erro);
  }
};

exports.atualizarStatus = (req, res) => {
  try {
    const pedido = service.atualizarStatus(
      req.params.id,
      req.body.status
    );
    return res.status(200).json(pedido);
  } catch (erro) {
    return tratarErro(res, erro);
  }
};
