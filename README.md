# Basket & Products API

API para gerenciamento de cestas de compras (baskets) e produtos, integrando com a Platzi Store. Permite criar cestas, adicionar/remover produtos, consultar produtos externos e gerenciar o status das cestas.

## Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Como Usar](#como-usar)
- [Documentação Swagger](#documentação-swagger)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Rotas da API](#rotas-da-api)
- [Contribuição](#contribuição)

## Visão Geral

Este projeto expõe uma API RESTful para manipulação de cestas de compras e integração com produtos da Platzi Store. Utiliza Express, MongoDB (via Mongoose) e integrações externas via Axios.

## Funcionalidades

- Listar produtos da Platzi Store
- Consultar detalhes de um produto externo
- Criar uma cesta para um cliente
- Adicionar/remover produtos na cesta
- Atualizar quantidade de produtos na cesta
- Consultar cestas por cliente ou todas as cestas
- Documentação interativa via Swagger

## Pré-requisitos

- [Node.js](https://nodejs.org/) >= 14.x
- [Docker](https://www.docker.com/) (para rodar o MongoDB facilmente)
- npm ou yarn

## Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/RiqueISantos/QuickShop.git
cd seu-projeto
npm install
```

## Configuração

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
PORT=8080
MONGO_URI=mongodb://localhost:27017/basketdb
```

## Subindo o MongoDB com Docker

Execute o comando abaixo para subir um container MongoDB local:

```bash
docker run --name basket-mongo -d -p 27017:27017 mongo:latest
```

> O banco estará acessível em `mongodb://localhost:27017/basketdb`.

## Como Usar

Inicie o servidor:

```bash
npm start
```

A API estará disponível em: [http://localhost:8080](http://localhost:8080)

## Documentação Swagger

Acesse a documentação interativa da API em: [http://localhost:8080/api-docs](http://localhost:8080/api-docs)

## Estrutura do Projeto

```plaintext
.
├── Controller/
│   ├── BasketController.ts
│   ├── ProductsController.ts
│   └── RouterManagement.ts
├── Service/
│   ├── BasketService.ts
│   └── PlatziStoreService.ts
├── enums/
│   ├── BasketStatus.ts
│   └── PaymentMethod.ts
├── models/
│   ├── BasketModel.ts
│   └── ProductModel.ts
├── database/
│   └── database.ts
├── config/
│   └── swagger.ts
├── server.ts
├── index.ts
└── ...
```

## Rotas da API

### Produtos

- `GET /products` Lista todos os produtos da Platzi Store.
- `GET /products/:id` Detalhes de um produto externo.

### Cestas

- `POST /basket` Cria uma nova cesta para um cliente.
  **Body:**
  ```json
  { "clientId": "string" }
  ```
- `GET /basket` Lista todas as cestas.
- `GET /basket/:clientId` Busca a cesta aberta de um cliente.
- `POST /basket/:clientId/:productId` Adiciona um produto à cesta do cliente.
- `PATCH /basket/:clientId/:productId` Atualiza a quantidade de um produto na cesta.
  **Body:**
  ```json
  { "quantity": number }
  ```
  ### Pagamento da Cesta

- `POST /basket/:clientId/payment/:paymentMethod`
  Realiza o pagamento da cesta aberta do cliente.

  **Url:**
  ```json
  {
    "paymentMethod": "string" // Exemplo: "CREDIT_CARD", "PIX", etc.
  }

## Contribuição

1. Fork este repositório.
2. Crie uma branch: `git checkout -b minha-feature`
3. Commit suas alterações: `git commit -m 'Minha nova feature'`
4. Push para a branch: `git push origin minha-feature`
5. Abra um Pull Request.
