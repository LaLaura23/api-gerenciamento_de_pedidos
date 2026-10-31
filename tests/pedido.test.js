
const request = require('supertest');
const app = require('../src/app');

describe('API de Gerenciamento de Pedidos', () => {

  // Dados válidos para criação de pedidos
  const pedidoValido = {
    cliente: 'Maria Silva',
    tipo: 'entrega',
    valor: 50,
    prioridade: 'normal'
  };

  // 1. Cadastro de pedido válido
  test('deve cadastrar um pedido e retornar status 201', async () => {
    const resposta = await request(app)
      .post('/pedidos')
      .send(pedidoValido);

    expect(resposta.status).toBe(201);
    expect(resposta.body.cliente).toBe('Maria Silva');
    expect(resposta.body.status).toBe('recebido');
    expect(resposta.body.id).toBeDefined();
  });

  // 2. Cadastro com cliente inválido
  test('deve retornar 400 quando o cliente estiver vazio', async () => {
    const resposta = await request(app)
      .post('/pedidos')
      .send({ ...pedidoValido, cliente: '   ' });

    expect(resposta.status).toBe(400);
    expect(resposta.body.erro).toBe('Nome do cliente inválido.');
  });

  // 3. Cadastro com tipo inválido
  test('deve retornar 400 quando o tipo for inválido', async () => {
    const resposta = await request(app)
      .post('/pedidos')
      .send({ ...pedidoValido, tipo: 'delivery' });

    expect(resposta.status).toBe(400);
    expect(resposta.body.erro).toBe('Tipo de pedido inválido.');
  });

  // 4. Cadastro com valor inválido
  test('deve retornar 400 quando o valor for inválido', async () => {
    const resposta = await request(app)
      .post('/pedidos')
      .send({ ...pedidoValido, valor: -10 });

    expect(resposta.status).toBe(400);
    expect(resposta.body.erro).toBe('Valor deve ser maior que zero.');
  });

  // 5. Cadastro com prioridade inválida
  test('deve retornar 400 quando a prioridade for inválida', async () => {
    const resposta = await request(app)
      .post('/pedidos')
      .send({ ...pedidoValido, prioridade: 'urgente' });

    expect(resposta.status).toBe(400);
    expect(resposta.body.erro).toBe('Prioridade inválida.');
  });

  // 6. Listagem de pedidos
  test('deve listar os pedidos cadastrados', async () => {
    await request(app).post('/pedidos').send(pedidoValido);

    const resposta = await request(app).get('/pedidos');

    expect(resposta.status).toBe(200);
    expect(Array.isArray(resposta.body)).toBe(true);
    expect(resposta.body.length).toBeGreaterThan(0);
  });

  // 7. Consulta de pedido existente
  test('deve consultar um pedido pelo ID', async () => {
    const cadastro = await request(app)
      .post('/pedidos')
      .send(pedidoValido);

    const id = cadastro.body.id;

    const resposta = await request(app).get(`/pedidos/${id}`);

    expect(resposta.status).toBe(200);
    expect(resposta.body.id).toBe(id);
    expect(resposta.body.cliente).toBe('Maria Silva');
  });

  // 8. Consulta de pedido inexistente
  test('deve retornar 404 para um pedido inexistente', async () => {
    const resposta = await request(app).get('/pedidos/999999');

    expect(resposta.status).toBe(404);
    expect(resposta.body.erro).toBe('Pedido não encontrado.');
  });

  // 9. Atualização válida de status
  test('deve atualizar o status para em_preparacao', async () => {
    const cadastro = await request(app)
      .post('/pedidos')
      .send(pedidoValido);

    const id = cadastro.body.id;

    const resposta = await request(app)
      .patch(`/pedidos/${id}/status`)
      .send({ status: 'em_preparacao' });

    expect(resposta.status).toBe(200);
    expect(resposta.body.status).toBe('em_preparacao');
  });

  // 10. Transição de status não permitida
  test('deve impedir uma transição de status inválida', async () => {
    const cadastro = await request(app)
      .post('/pedidos')
      .send(pedidoValido);

    const id = cadastro.body.id;

    const resposta = await request(app)
      .patch(`/pedidos/${id}/status`)
      .send({ status: 'enviado' });

    expect(resposta.status).toBe(400);
    expect(resposta.body.erro).toBe(
      'Transição de status não permitida.'
    );
  });

  // 11. Atualização de pedido inexistente
  test('deve retornar 404 ao atualizar um pedido inexistente', async () => {
    const resposta = await request(app)
      .patch('/pedidos/999999/status')
      .send({ status: 'em_preparacao' });

    expect(resposta.status).toBe(404);
    expect(resposta.body.erro).toBe('Pedido não encontrado.');
  });

  // 12. Rota inexistente
  test('deve retornar 404 para uma rota não encontrada', async () => {
    const resposta = await request(app).get('/rota-inexistente');

    expect(resposta.status).toBe(404);
    expect(resposta.body.erro).toBe('Rota não encontrada.');
  });

});
