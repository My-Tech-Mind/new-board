# New Board

---

## Estrutura Geral do Projeto

---

## 1ª Tela: Login

- Tarefas:

  - Login
  - Cadastro Usuário
    - Atualizar Usuário
    - Excluir Usuário

- Rotas:

  1. POST/login
  2. POST/user 3) PUT/usuario 4) DELETE/usuario

---

## 2ª Tela: Página Inicial

- Tarefas:

  - Criar board
    - Possibilitar duplicação de board (cria outro board igual)
  - Editar board
  - Meus boards (listagem de todos os boards com os recentes primeiro)
    - Boards favoritos (por filtro de favorito)
  - Detalhamento do board (acesso/abertura do board)
  - Excluir board

- Rotas:

  5. POST/board
  6. PUT/board/:id
  7. GET/board 7) GET/quadro/?filtro[]
  8. GET/quadro/:id
  9. DELETE/board/:id

---

## 3ª Tela: Board com Cards [LIMITAÇÃO: 5 cards por board]

- Tarefas: [Vamos listar cards?]
  - Criar card (cards = listas que contém tasks = objetos)
  - Editar card
    - copiar card (cria outro card igual no board)
  - Exclusão de card
  - Criar task
  - Editar task
    - ...
    - mover (muda board_id de card)
    - copiar (cria outra task igual no card)
  - Detalhar task
  - Exclusão de task
- Rotas:

  10. POST/card
  11. PUT/card/:id
  12. DELETE/card/:id
  13. POST/task
  14. PUT/task/:id
  15. GET/task/:id
  16. DELETE/task/:id

---

## Banco de Dados

- usuarios
  id serial (primary key)
  nome varchar(255)
  email varchar(255) (único)
  senha varchar(255)
- boards
  id serial (primary key)
  titulo varchar(255)
  favoritado boolean
  usuario_id integer (foreign_key)
  data_de_criacao datetime
  data_de_atualizacao datetime
- cards
  id serial (primary key)
  titulo varchar(255)
  board_id integer (foreign_key)

- tasks
  id serial (primary key)
  titulo varchar(255)
  descricao text
  card_id integer (foreign_key)

---

## Rotas

### 1) Login de usuário: POST/login

#### Descrição: Esta é a rota que será usada para o usuário fazer login.

#### Dados enviados

- email
- senha

#### Dados retornados (status code 200)

- sucesso / erro (sucesso: retorna todos os dados enviados menos a senha; erro: retorna status e msg de erro)
- token

{objeto json com exemplo de retorno}

#### Validações:

---

### 2) Cadastro de usuário: POST/user

#### Descrição: Esta é a rota que será usada para cadastrar um usuário no sistema.

#### Dados enviados

- nome
- email
- senha

#### Dados retornados (status code 201)

- id
- nome
- email

{objeto json com exemplo de retorno}

#### Validações:

---

## ATENÇÃO: Todas as rotas a seguir exigem que o usuário esteja logado para acessá-las.

---

### 3) Listar usuário logado: GET/user

#### Descrição: Esta é a rota que será usada para exibir os dados do usuário logado.

#### Dados enviados

- token no formato bearer token no cabeçalho da requisição.

#### Dados retornados (status code 200)

- id
- nome
- email

{objeto json com exemplo de retorno}

#### Validações:

---

### 4) Atualização de usuário: PUT/user

#### Descrição: Esta é a rota que será usada para atualizar os dados do usuário.

#### Dados enviados

- token no formato bearer token no cabeçalho da requisição.

#### Dados retornados (status code 200)

- id
- nome
- email

{objeto json com exemplo de retorno}

#### Validações:

---

### 5) Exclusão de usuário: DELETE/user

#### Descrição: Esta é a rota que será usada para excluir os dados do usuário.

#### Dados enviados

- token no formato bearer token no cabeçalho da requisição.

#### Dados retornados (status code 204)

- sem retorno de conteúdo

{objeto json com exemplo de retorno}

#### Validações:

---

### 6) Criação de board: POST/board

#### Descrição: Esta é a rota que será usada para criar um board.

#### Dados enviados

- titulo

#### Dados retornados (status code 201)

- id
- titulo
- favoritado
- usuario_id

{objeto json com exemplo de retorno}

#### Validações:

---

### 7) Edição de board: PUT/board/:id

#### Descrição: Esta é a rota que será usada para editar um board.

#### Dados enviados

- titulo
- favoritado

#### Dados retornados (status code 200)

- id
- titulo
- favoritado
- usuario_id

{objeto json com exemplo de retorno}

#### Validações:

---

### 8) Listagem de boards (com recentes primeiro): GET/board

#### Descrição: Esta é a rota que será usada para listar os boards do usuário.

#### Dados enviados

- token no formato bearer token no cabeçalho da requisição.

#### Dados retornados (status code 200)

- id
- titulo
- favoritado
- usuario_id

{objeto json com exemplo de retorno}

#### Validações:

---

#### 9) Listagem de boards favoritos: GET/board/?filter[]

#### Descrição: Esta é a rota que será usada para listar os boards favoritos do usuário.

#### Dados enviados

- token no formato bearer token no cabeçalho da requisição.

#### Dados retornados (status code 200)

- id
- titulo
- favoritado
- usuario_id

{objeto json com exemplo de retorno}

#### Validações:

---

### 10) Detalhamento de board: GET/board/:id

#### Descrição: Esta é a rota que será usada para detalhar/acessar um board específico do usuário.

#### Dados enviados

- token no formato bearer token no cabeçalho da requisição.

#### Dados retornados (status code 200)

- id
- titulo
- favoritado
- usuario_id

- tabela cards

  - id
  - titulo
  - board_id

- tasks
  - id
  - titulo
  - descricao
  - card_id

{objeto json com exemplo de retorno}

listagem = lista
board = objeto
card = lista de objetos
task = lista de objetos

[
{
id:
titulo:
favoritado:
usuario_id:

card: [{
id:
titulo:
board_id:

tasks: [{
id:
titulo:
descricao:
card_id:
}]
}]
},
]

#### Validações:

---

### 11) Excluir board: DELETE/board/:id

#### Descrição: Esta é a rota que será usada para excluir um board do usuário.

#### Dados enviados

- token no formato bearer token no cabeçalho da requisição.

#### Dados retornados (status code 204)

- sem retorno

{objeto json com exemplo de retorno}

#### Validações:

---

### 12) Criação de card: POST/card

#### Descrição: Esta é a rota que será usada para criar um card no board.

#### Dados enviados

- titulo
- board_id

#### Dados retornados (status code 201)

- id
- titulo
- board_id

{objeto json com exemplo de retorno}

#### Validações:

---

### 13) Edição de card: PUT/card/:id

#### Descrição: Esta é a rota que será usada para editar um card no board.

#### Dados enviados

- titulo
- board_id

#### Dados retornados (status code 200)

- id
- titulo
- board_id

{objeto json com exemplo de retorno}

#### Validações:

---

### 14) Exclusão de card: DELETE/card/:id

#### Descrição: Esta é a rota que será usada para excluir um card no board.

#### Dados enviados

- token no formato bearer token no cabeçalho da requisição.

#### Dados retornados (status code 204)

- sem retorno

{objeto json com exemplo de retorno}

#### Validações:

---

### 15) Criação de task: POST/task/:id

#### Descrição: Esta é a rota que será usada para criar uma task no card.

#### Dados enviados

- titulo
- descricao
- card_id

#### Dados retornados (status code 201)

- id
- titulo
- descricao
- card_id

{objeto json com exemplo de retorno}

#### Validações:

---

### 16) Edição de task: PUT/task/:id

#### Descrição: Esta é a rota que será usada para editar uma task no card.

#### Dados enviados

- titulo
- descricao
- card_id

#### Dados retornados (status code 200)

- id
- titulo
- descricao
- card_id

{objeto json com exemplo de retorno}

#### Validações:

---

### 17) Detalhamento de task: GET/task/:id

#### Descrição: Esta é a rota que será usada para detalhar/acessar uma task no card.

#### Dados enviados

- token no formato bearer token no cabeçalho da requisição.

#### Dados retornados (status code 200)

- id
- titulo
- descricao
- card_id

{objeto json com exemplo de retorno}

#### Validações:

---

### 18) Exclusão de task: DELETE/task/:id

#### Descrição: Esta é a rota que será usada para excluir uma task do card.

#### Dados enviados

- token no formato bearer token no cabeçalho da requisição.

#### Dados retornados (status code 204)

- sem retorno

{objeto json com exemplo de retorno}

#### Validações:

---

Extras:

Foto de Perfil? [versão nova]

Membros de board [versão nova]

Etiquetas? [versão nova]

- etiquetas [extra... nova versão]
  id
  cor

Imagem do fundo da área dos boards? [versão nova]

Favoritar board? [SIM]

Compartilhar board? [versão nova nova]

Prioridade ou ordem no banco de dados [versão nova]

Mover card dentro do board [versão nova]

---
