# API de Gerenciamento de Pedidos

## 1. Descrição do Projeto

Projeto prático desenvolvido para a disciplina de **Tópicos Avançados em Sistemas de Informação II**.

A API REST tem como objetivo gerenciar pedidos de uma pequena loja, permitindo cadastrar, listar, consultar e atualizar pedidos.

## 2. Tecnologias Utilizadas

- Node.js
- Express
- JavaScript
- Jest
- Supertest
- Postman
- Git e GitHub

## 3. Arquitetura do Projeto

A aplicação utiliza arquitetura em camadas, separando as responsabilidades:

- **Routes:** definem os endpoints da API.
- **Controllers:** recebem as requisições HTTP e encaminham as operações.
- **Services:** implementam as regras de negócio e validações.
- **Tests:** armazenam os testes automatizados.

## 4. Instalação

É necessário ter o Node.js instalado.

Clone o repositório:

```bash
git clone https://github.com/jcso-2006/api-gerenciamento-pedidos.git
```

Entre na pasta do projeto:

```bash
cd api-gerenciamento-pedidos
```

Instale as dependências:

```bash
npm install
```

## 5. Execução da API

Para iniciar a aplicação:

```bash
npm start
```

## 6. Endpoints Disponíveis

| Método | Rota | Descrição |
|---|---|---|
| POST | `/pedidos` | Cadastrar um pedido |
| GET | `/pedidos` | Listar todos os pedidos |
| GET | `/pedidos/:id` | Consultar pedido pelo identificador |
| PATCH | `/pedidos/:id/status` | Atualizar o status de um pedido |

## 7. Exemplo de Cadastro de Pedido

**Requisição:** `POST /pedidos`

```json
{
  "cliente": "Carlos Silva",
  "tipo": "entrega",
  "valor": 350,
  "prioridade": "normal"
}
```

**Resposta esperada:** HTTP 201 Created.

```json
{
  "id": 1,
  "cliente": "Carlos Silva",
  "tipo": "entrega",
  "valor": 350,
  "prioridade": "normal",
  "status": "recebido"
}
```

## 8. Validações e Regras de Negócio

A API implementa as seguintes validações:

- O nome do cliente é obrigatório e não pode conter apenas espaços.
- O valor deve ser numérico e maior que zero.
- O tipo do pedido deve ser `entrega` ou `retirada`.
- A prioridade deve ser `baixa`, `normal` ou `alta`.
- Todo pedido começa com o status `recebido`.
- Identificadores inexistentes retornam HTTP 404.
- Dados inválidos retornam HTTP 400.
- Erros inesperados recebem tratamento apropriado, com HTTP 500.

### Fluxo de Status

As transições permitidas são:

- `recebido` → `em_preparacao` ou `cancelado`.
- `em_preparacao` → `enviado` ou `cancelado`.
- `enviado` → `entregue`.
- `entregue` e `cancelado` são estados finais.

## 9. Testes

Os testes manuais foram realizados utilizando o Postman, verificando as requisições, respostas e códigos HTTP.

Os testes automatizados utilizam Jest e Supertest.

Para executar os testes automatizados:

```bash
npm test
```

As evidências dos testes manuais estão disponíveis na pasta `evidencias/`.

## 10. Padrão Implementado

Foi adotada a arquitetura em camadas, com separação entre Routes, Controllers e Services.

Essa organização permite separar as responsabilidades da aplicação, facilitando a manutenção, compreensão e evolução do código.

## 11. Uso de IA

Foi utilizada inteligência artificial como ferramenta de apoio durante o desenvolvimento do projeto, auxiliando na organização da arquitetura, implementação de validações, análise de erros, documentação e orientação na realização dos testes.

Uma sugestão aceita foi separar as responsabilidades entre Controllers e Services, mantendo as regras de negócio concentradas na camada de serviços. Essa organização foi adotada para facilitar a manutenção e a compreensão do código.

O código foi revisado e testado durante o desenvolvimento, permanecendo sob responsabilidade do aluno.