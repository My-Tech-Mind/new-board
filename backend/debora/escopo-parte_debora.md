# PARTE DÉBORA

7. Edição de board
8. Listagem de boards
9. Listagem de boards favoritos
10. Detalhamento de board
11. Excluir board
12. Criação de card

---

### 7) Edição de board: PUT/board/:id

#### Descrição: Esta é a rota que será usada para editar um board.

#### Dados enviados

- Token de autenticação
- Parâmetro: de rota - ID do board a ser editado
- Body da requisição:
  - titulo
  - favoritado

#### Dados retornados (status code 200)

- id
- titulo
- favoritado
- usuario_id
- data_de_criacao
- data_de_atualizacao

#### Requisitos

- Validar se existe um board para o ID informado como parâmetro de url
- Validar os campos obrigatórios:
  - titulo
  - favoritado
- Validar se o titulo informado tem até 20 caracteres
- Validar se o campo favoritado recebeu o valor "true" ou "false"
- Atualizar no banco de dados a data_de_atualizacao do board assim que os dados da requisição forem enviados
- Atualizar os dados do board no banco de dados

#### **Exemplos de requisição bem-sucedida**

```javascript
// POST/board/1
{
    "titulo": "Tarefas Semanais"
    "favoritado": true
}
```

#### **Exemplos de resposta bem-sucedida**

```javascript
// HTTP Status: 200
{
   "id": 1
   "titulo": "Tarefas Semanais"
   "favoritado": true
   "usuario_id": 1
   "data_de_criacao": 2024-02-01 14:11:09
   "data_de_atualizacao": 2024-02-01 17:42:20
}
```

#### **Exemplos de resposta mal-sucedida**

```javascript
// HTTP Status: 401
{
   "mensagem": "Você precisa estar logado para acessar este recurso."
}

// HTTP Status: 404
{
   "mensagem": "Board não encontrado."
}

// HTTP Status: 400
{
   "mensagem": "O título do board é obrigatório."
}

// HTTP Status: 400
{
   "mensagem": "O status de favoritado do board é obrigatório."
}

// HTTP Status: 400
{
    "mensagem": "O título do board só pode ter até 20 caracteres."
}

// HTTP status: 400
{
    "mensagem": "O campo favoritado só aceita valores "true" ou "false"."
}
```

---

### 8) Listagem de boards (com recentes primeiro): GET/board

#### Descrição: Esta é a rota que será usada para listar os boards do usuário.

#### Dados enviados

- Token de autenticação
- Parâmetro: [x]
- Body da requisição: [x]

#### Dados retornados (status code 200)

- Lista com os boards (objetos) encontrados; sendo que os boards recentemente atualizados aparecerão primeiro na listagem.

#### Requisitos [x]

#### **Exemplos de requisição bem-sucedida**

```javascript
// GET/board
// Sem conteúdo no body da requisição
```

#### **Exemplos de resposta bem-sucedida**

```javascript
// HTTP Status: 200
[
{
   "id": 1
   "titulo": "Tarefas Semanais"
   "favoritado": true
   "usuario_id": 1
   "data_de_criacao": 2024-02-01 14:11:09
   "data_de_atualizacao": 2024-02-01 17:42:20
},
 {
   "id": 2
   "titulo": "Projeto Escola"
   "favoritado": false
   "usuario_id": 1
   "data_de_criacao": 2024-01-15 10:00:51
   "data_de_atualizacao": 2024-01-15 10:00:51
 }
];
```

```javascript
// HTTP Status: 200
[];
```

#### **Exemplos de resposta mal-sucedida**

```javascript

// HTTP Status: 401
{
   "mensagem": "Você precisa estar logado para acessar este recurso."
}
```

### 9) Caso Especial de Listagem de Boards - Favoritos: GET/board/?favorite=true

#### Descrição: Esta é a rota que será usada para listar os boards favoritos do usuário.

#### Dados enviados

- Token de autenticação
- Parâmetro: de consulta - favorite (status de favoritado=true)
- Body da requisição: [x]

#### Dados retornados (status code 200)

- Lista com os boards favoritos (objetos) encontrados.

#### Requisitos

- O parâmetro de consulta favorite é opcional, mas caso ele seja informado, é preciso validar se foi informado corretamente, isto é, com valor true.

#### **Exemplos de requisição bem-sucedida**

```javascript
// GET/board/?favorite=true
// Sem conteúdo no body da requisição
```

#### **Exemplos de resposta bem-sucedida**

```javascript
// HTTP Status: 200
[
{
   "id": 1
   "titulo": "Tarefas Semanais"
   "favoritado": true
   "usuario_id": 1
   "data_de_criacao": 2024-02-01 14:11:09
   "data_de_atualizacao": 2024-02-01 17:42:20
}
];
```

```javascript
// HTTP Status: 200
[];
```

#### **Exemplos de resposta mal-sucedida**

```javascript

// HTTP Status: 401
{
   "mensagem": "Você precisa estar logado para acessar este recurso."
}

// HTTP Status: 400
{
   "mensagem": "O parâmetro de consulta, favorite, deve ter o valor true."
}
```

---

### 10) Detalhamento de board: GET/board/:id

#### Descrição: Esta é a rota que será usada para detalhar/acessar um board específico do usuário.

#### Dados enviados

- Token de autenticação
- Parâmetro: de rota - ID do board a ser detalhado
- Body da requisição [x]

#### Dados retornados (status code 200)

- Exibição de uma lista contendo o board (objeto) encontrado, o qual contém seus respectivos cards (lista de objetos) com suas respectivas tasks (lista de objetos).
  Cada board, sendo um objeto, tem como propriedades os seus dados (id, titulo, favoritado, usuario_id, data_de_criacao, data_de_atualizacao) e seus respectivos cards.
  Por sua vez, os cards são listados como objetos, contendo como propriedades seus dados (id, titulo, board_id) e suas respectivas tasks.
  Por fim, as tasks também são listadas como objetos, cujas propriedades consistem nos seus dados (id, titulo, descricao, card_id).

#### Requisitos

- Validar se existe um board para o id informado como parâmetro de url

#### **Exemplos de requisição bem-sucedida**

```javascript
// GET/board/1
// Sem conteúdo no body da requisição
```

#### \*\*Exemplos de resposta bem-sucedida

```javascript
// HTTP Status: 200
[
{
   "id": 1
   "titulo": "Tarefas Semanais"
   "favoritado": true
   "usuario_id": 1
   "data_de_criacao": 2024-02-01 14:11:09
   "data_de_atualizacao": 2024-02-01 17:42:20
   "cards": [
        {
            "id": 1
            "titulo": Limpar os cômodos da casa
            "board_id": 1
            "tasks": [
                {
                    "id": 1
                    "titulo": Quarto
                    "descricao": Tirar o pó dos móveis, varrer e passar pano no chão.
                    "card_id": 1
                }
            ]
        }
    ]
}
]
```

#### **Exemplos de resposta mal-sucedida**

```javascript

// HTTP Status: 401
{
   "mensagem": "Você precisa estar logado para acessar este recurso."
}

// HTTP Status: 404
{
   "mensagem": "Board não encontrado."
}
```

---

### 11) Excluir board: DELETE/board/:id

#### Descrição: Esta é a rota que será usada para excluir um board do usuário.

#### Dados enviados

- Token de autenticação:
- Parâmetro: de rota - ID do board a ser excluído
- Body da requisição: [x]

#### Dados retornados (status code 204)

- Sem retorno no body

#### Requisitos

- Validar se existe um board para o id enviado como parâmetro de url
- Excluir o board no banco de dados

#### **Exemplos de requisição bem-sucedida**

```javascript
// DELETE/board/2
// Sem conteúdo no body da requisição
```

#### **Exemplos de resposta bem-sucedida**

```javascript
// HTTP Status Code: 204
// Sem conteúdo no body da resposta
```

#### **Exemplos de resposta mal-sucedida**

```javascript
// HTTP Status Code: 401
{
    "mensagem": "Você precisa estar logado para acessar este recurso."
}

// HTTP Status Code: 404
{
    "mensagem": "Board não encontrado."
}
```

---

### 12) Criação de card: POST/card

#### Descrição: Esta é a rota que será usada para criar um card no board.

#### Dados enviados

- Token de autenticação
- Parâmetro: [x]
- Body da requisição:
  - titulo
  - board_id

#### Dados retornados (status code 201)

- id
- titulo
- board_id

#### Requisitos

- Validar os campos obrigatórios:
  - titulo
  - board_id
- Validar se o titulo informado tem até 20 caracteres
- Validar se o board_id informado existe no banco de dados
- Validar se o usuário não excedeu o limite de 10 cards criados por boards
- Atualizar no banco de dados a data_de_atualizacao do board assim que os dados da requisição de criação de um novo card seu forem enviados
- Cadastrar o card no banco de dados

#### **Exemplos de requisição bem-sucedida**

```javascript
// POST/card
{
    "titulo": "Fazer a comida da semana"
    "board_id": 1
}
```

#### **Exemplos de resposta bem-sucedida**

```javascript
// HTTP Status Code: 200
{
    "id": 2
    "titulo": "Fazer a comida da semana"
    "board_id": 1
}
```

#### **Exemplos de resposta mal-sucedida**

```javascript
// HTTP Status Code: 401
{
    "mensagem": "Você precisa estar logado para acessar este recurso"
}

// HTTP Status Code: 400
{
    "mensagem": "O título do board é obrigatório"
}

// HTTP Status Code: 400
{
    "mensagem": "O board_id é obrigatório"
}

// HTTP Status Code: 400
{
    "mensagem": "O título do board só pode ter até 20 caracteres."
}

// HTTP Status Code: 404
{
    "mensagem": "Board não encontrado."
}

// HTTP Status Code: 403
{
    "mensagem": "Não é possível criar mais um card neste board, você só pode ter 10 cards por board."
}
```

---
