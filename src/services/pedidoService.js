let pedidos = [];
let proximoId = 1;

function criarErro(tipo, mensagem) {
  const erro = new Error(mensagem);
  erro.tipo = tipo;
  return erro;
}

function criarPedido(dados) {
  const { cliente, tipo, valor, prioridade } = dados;

  if (!cliente || typeof cliente !== "string" || !cliente.trim()) {
    throw criarErro("VALIDACAO", "Nome do cliente inválido.");
  }

  if (!["entrega", "retirada"].includes(tipo)) {
    throw criarErro("VALIDACAO", "Tipo de pedido inválido.");
  }

  if (typeof valor !== "number" || valor <= 0) {
    throw criarErro("VALIDACAO", "Valor deve ser maior que zero.");
  }

  if (!["baixa", "normal", "alta"].includes(prioridade)) {
    throw criarErro("VALIDACAO", "Prioridade inválida.");
  }

  const pedido = {
    id: proximoId++,
    cliente: cliente.trim(),
    tipo,
    valor,
    prioridade,
    status: "recebido"
  };

  pedidos.push(pedido);
  return pedido;
}

function listarPedidos() {
  return pedidos;
}

function buscarPedidoPorId(id) {
  const pedido = pedidos.find(p => p.id === Number(id));

  if (!pedido) {
    throw criarErro("NAO_ENCONTRADO", "Pedido não encontrado.");
  }

  return pedido;
}

function atualizarStatus(id, novoStatus) {
  const pedido = buscarPedidoPorId(id);

  const transicoes = {
    recebido: ["em_preparacao", "cancelado"],
    em_preparacao: ["enviado", "cancelado"],
    enviado: ["entregue"],
    entregue: [],
    cancelado: []
  };

  if (!transicoes[pedido.status].includes(novoStatus)) {
    throw criarErro("VALIDACAO", "Transição de status não permitida.");
  }

  pedido.status = novoStatus;
  return pedido;
}

module.exports = {
  criarPedido,
  listarPedidos,
  buscarPedidoPorId,
  atualizarStatus
};
