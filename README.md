
# **Projeto de API com Prisma, TypeScript, Node.js e SQLite**

Este projeto demonstra a criação de uma API usando Prisma, TypeScript, Node.js e SQLite. A aplicação permite gerenciar informações relacionadas a usuários e tecnologias. Você pode listar usuários, adicionar novos usuários, visualizar tecnologias associadas a um usuário e realizar operações CRUD básicas nas tecnologias.

## Requisitos
Antes de começar, certifique-se de ter as seguintes ferramentas instaladas em seu sistema:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (gerenciador de pacotes do Node.js)
- [TypeScript](https://www.typescriptlang.org/) (Superset tipado de JavaScript.)
- [Prisma](https://www.prisma.io/docs/getting-started) (ORM (Object-Relational Mapping) para acessar o banco de dados.)
- [Insomnia](https://insomnia.rest/download)
- Banco de Dados SQLite: O SQLite é usado como banco de dados neste projeto. Certifique-se de ter o SQLite esteja configurado em seu projeto.

## Instalação
1. Clone este repositório:
https://github.com/7-Dodi/Api-Rest-Sqlite.git

2. Navegue até o diretório do projeto:
cd Api-Rest-Sqlite

3. Instale as dependências:
npm install

4. Adicione um arquivo de váriavel global (.env):
```bash
# Environment variables declared in this file are automatically made available to Prisma.
# See the documentation for more detail: https://pris.ly/d/prisma-schema#accessing-environment-variables-from-the-schema

# Prisma supports the native connection string format for PostgreSQL, MySQL, SQLite, SQL Server, MongoDB and CockroachDB.
# See the documentation for all the connection string options: https://pris.ly/d/connection-strings

DATABASE_URL="file:./dev.db"
SECRET="your-secret-token"
```
5. Instancie o Banco de Dados:
```bash
npx prisma db push
```
Ou se você não tem Prisma CLI instalado globalmente:

```bash
npx prisma migrate dev
```

## Uso
1. Inicie o servidor:
```bash
npm run dev
```

2. A API estará disponível em: `http://localhost:5000`

## Rotas

- POST /users: Adiciona um novo usuário.
- POST /users/authentication: Cria token para o usuário.
- GET /users: Retorna todos os usuários armazenados (desde que o usuário tenha um token válido).
- GET /technologies: Retorna todas as tecnologias do usúario passado pelo o `heard` da aplicação.
- POST /technologies: Adiciona uma nova tecnologia ao usuário passado pelo o `heard` da aplicação.
- PUT /technologies/:id: Atualiza o `title` e o `deadline` de uma tecnologia existente.
- PATCH /technologies/:id/studied: Atualiza o atributo studied para `true`
- DELETE /technologies/:id: Remove uma tecnologia existe de um usuário passado pelo `heard`da aplicação.

## Exemplos de uso de rotas:
### Requisição de Usuário:
- **POST /users:**
```bash
http://localhost:5000/technologies
```
- **POST /users/authentication:**
```bash
http://localhost:5000/users/authentication
```
- **GET /users:**
```bash
http://localhost:5000/users
```
### Requisição de Technologies:
- **GET /technologies:**
```bash
http://localhost:5000/technologies
```
- **POST /technologies:**
```bash
http://localhost:5000/technologies
```
- **PUT /technologies/:id**
```bash
http://localhost:5000/technologies/id
```
- **PATCH /technologies/:id/studied**
```bash
http://localhost:5000/technologies/id/studied
```
- **DELETE /technologies/:id**
```bash
http://localhost:5000/technologies/id
```
Este projeto fornece uma base sólida para o desenvolvimento de aplicativos web e APIs usando tecnologias modernas, como Prisma, TypeScript e Node.js, com o banco de dados SQLite. Certifique-se de revisar e personalizar as rotas e modelos de acordo com suas necessidades.
