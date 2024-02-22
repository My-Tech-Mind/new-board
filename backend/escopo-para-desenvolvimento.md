## Cadastro e login de usuário

### Cadastro de usuário POST/user

**Descrição: Esta é a rota que será usada para cadastrar um usuário no sistema.**

- Será enviado um objeto no formato JSON com nome, email e senha.

```javascript
//Dados enviados:

{
    "nome": "Bonates",
    "email": "bonates@email.com",
    "senha": "senha123"
}

```

**Critérios de aceite:**

- Verificar se o nome, email e senha foram passados no body

  - `nome: string`
  - `email: string`
  - `senha: string`

- Verificar Se o email enviado já existe no banco de dados

**Exemplo de requisição mal sucedida:**

```javascript
//Status code 400

{
  mensagem: `O campo ${campo} é obrigatório`;
}
```

```javascript
//status code 400
{
  mensagem: `O campo ${campo} tem que ser uma string`;
}
```

```javascript
//status code 401

{
  mensagem: `O email informado já existe`;
}
```

```javascript
// status code 400

{
  mensagem: `Formato de email inválido`;
}
```

**Em caso de requisição bem sucedida:**

- Criptografar Senha e inseri-la no banco de dados.
- Inserir o usuário cadastrado no banco de dados

- Retornar:
  - id
  - nome
  - email

**Exemplo de requisição bem sucedida:**

```javascript
//status code 201

{
    id: 1,
    nome: 'Bonates'
    email: 'bonates@email.com'
}

```

### Login de usuario POST/login

**Descrição:Esta é a rota que será usada para o usuário fazer login.**

- Será enviado um objeto no formato JSON com email e senha.

**Critérios de aceite:**

- Validar Os campos obrigatórios:

  - `email: string`
  - `senha: string`

- Validar se o email consta no banco de dados
- Validar se a senha fornecida está correta

```javascript
//Dados enviados:

{
    "email": "bonates@email.com",
    "senha": "senha3241"
}

```

**Exemplo de requisição mal sucedida:**

```javascript
//status code: 401

{
  mensagem: `O email ou a senha estão incorretos`;
}
```

```javascript
//status code: 400
{
  mensagem: `O campo ${campo} é obrigatório.`;
}
```

```javascript
//status code: 400
{
  mensagem: `O campo ${campo} tem que ser uma string`;
}
```

**Em caso de requisição bem sucedida**

- Criar token do acesso com expiração de 24h.

- Retornar os dados do usuario em um array com:

  - id
  - nome
  - email
  - token

```javascript
//status code 200

[
  {
    id: 1,
    nome: "Bonates",
    email: "bonates@email.com",
  },

  {
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  },
];
```

# ATENÇÃO: Todas as rotas a seguir exigem que o usuário esteja logado para acessá-las.

### Detalhar usuário logado: GET/user

**Descrição: Esta é a rota que será usada para exibir os dados do usuário logado.**

**Dados enviados:**

- token no formato bearer token no cabeçalho da requisição.

```javascript
// Dados enviados
{
  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
}
```

**Critérios de aceite:**

- O usuário precisa estar logado no sistema.

**Exemplo de requisição mal sucedida:**

```javascript
//status code 401

{
  mensagem: `Não autorizado`;
}
```

**Em caso de requisição bem sucedida:**

- Retornar os dados do usuário:
  - id
  - nome
  - email

**Exemplo de requisição bem sucedida:**

```javascript
//status code: 200
{
    id: 1,
    nome: 'Bonates',
    email: 'bonates@email.com'

}
```

### Atualizar usuário logado: PUT/user

**Descrição: Esta é a rota que será usada para atualizar os dados do usuário logado.**

**Dados enviados:**

- token no formato bearer token no cabeçalho da requisição.

- JSON com as informações que o usuário deseja alterar

```javascript
//Dados enviados
{
    "nome": "igor",
    "email": "bonates@email.com",
    "senha": "senha321"
}
```

**Critérios de aceite:**

- O usuário precisa estar logado no sistema

- Caso email seja informado, verificar se já existe outro usuário com esse email.

- Criptografar a senha caso seja informada.

**Exemplo de requisição mal sucedida:**

```javascript
//status code 401

{
  mensagem: `Não autorizado`;
}
```

```javascript
//status code 401

{
  mensagem: `O email informado já pertence a outro usuário`;
}
```

```javascript
//status code 400

{
  mensagem: `O campo ${campo} tem que ser do tipo string`;
}
```

**Em caso de requisição bem sucedida:**

- Se a senha for alterada, guardar o hash no banco de dados

- Retornar os dados do usuário:
  - id
  - nome
  - email

**Exemplo de requisição bem sucedida:**

```javascript
//status code: 200
{
    id: 1,
    nome: 'Bonates',
    email: 'bonates@email.com'

}
```

### Exclusão de usuário: DELETE/user

**Descrição: Esta é a rota que será usada para excluir os dados do usuário.**

**Dados enviados**

- token no formato bearer token no cabeçalho da requisição.

**Critérios de aceite:**

- O usuário precisa estar logado.

**Exemplo de requisição mal sucedida:**

```javascript
//status code 401

{
  mensagem: "Não autorizado";
}
```

**Em caso de requisição bem sucedida**

- Sem retorno de conteúdo.

```javascript
// status code 200
```

### Criação de Board: POST/board

**Descrição: Esta é a rota que será usada para criar um board.**

**Dados enviados**

- Token no formato bearer token no cabeçalho da requisição.

- JSON com o titulo do board

  - `titulo: string`

```javascript
// Dados enviados
{
    "titulo": "Tarefas Semanais"
}

```

**Critérios de aceite:**

- O usuário precisa estar logado.

- Verificar se o campo título foi passado corretamente.

- Validar se o usuário não excedeu o limite de 5 boards criados.

**Exemplo de requisição mal sucedida:**

```javascript
//status code: 401

{
  mensagem: "Não autorizado";
}
```

```javascript
//status code: 400

{
  mensagem: `O campo titulo é obrigatório.`;
}
```

```javascript
//status code: 400

{
  mensagem: "O campo titulo precisa ser do tipo string";
}
```

**Em caso de requisição bem sucedida:**

- Inserir os Dados do board no banco de dados
- Retornar os dados:
  - id
  - titulo
  - favoritado
  - usuario_id
  - data_de_criacao
  - data_de_atualizacao

**Exemplo de requisição bem sucedida:**

```javascript
//status code 201
{
    id: 1,
    titulo: 'Tarefas Semanais',
    favoritado: false,
    usuario_id: 1
    data_de_criacao: 2024-02-01 14:11:09
    data _de_atualizacao: 2024-02-01 14:11:09
}
```

### 7) Edição de board: PUT/board/:id

#### Descrição: Esta é a rota que será usada para editar um board.

#### Dados enviados

- Token de autenticação
- Parâmetro: de rota - ID do board a ser editado
- Body da requisição:
  - titulo

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
   "mensagem": "O campo titulo é obrigatório."
}

// HTTP Status: 400
{
    "mensagem": "O titulo do board só pode ter até 20 caracteres."
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

### 9) Caso Especial de Listagem de Boards - Favoritos: GET/board/?favorited=true

#### Descrição: Esta é a rota que será usada para listar os boards favoritos do usuário.

#### Dados enviados

- Token de autenticação
- Parâmetro: de consulta - favorited (status de favoritado=true)
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
   "mensagem": "O parâmetro de consulta, favorited, deve ter o valor true."
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

- Exibição do board (objeto) encontrado, o qual contém seus respectivos cards (lista de objetos) com suas respectivas tasks (lista de objetos).
  - Cada board, sendo um objeto, tem como propriedades os seus dados (id, titulo, favoritado, usuario_id, data_de_criacao, data_de_atualizacao) e seus respectivos cards.
  - Por sua vez, os cards são listados como objetos, contendo como propriedades seus dados (id, titulo, board_id, posicao) e suas respectivas tasks.
  - Por fim, as tasks também são listadas como objetos, cujas propriedades consistem nos seus dados (id, titulo, descricao, card_id, posicao).
  - Os cards com suas respectivas tasks são listados de acordo com o número informado na propriedade "posicao", em ordem crescente.

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
            "posicao": 1
            "tasks": [
                {
                    "id": 1
                    "titulo": Quarto
                    "descricao": Tirar o pó dos móveis, varrer e passar pano no chão.
                    "card_id": 1,
                    "posicao": 1
                }
            ]
        }
    ]
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
- ordem

#### Requisitos

- Validar os campos obrigatórios:
  - titulo
  - board_id
- Validar se o titulo informado tem até 20 caracteres
- Validar se o board_id informado existe no banco de dados
- Validar se o usuário não excedeu o limite de 10 cards criados por boards
- Atualizar no banco de dados a data_de_atualizacao do board assim que os dados da requisição de criação de um novo card seu forem enviados
- Cadastrar o card no banco de dados
  - Lembrar de registrar o número de ordem do card no banco de dados para indicar a posição que ele ocupa na página. Na criação do card, o número de ordem que lhe será atribuído é o maior dentre os já armazenados na coluna ordem da tabela card (lembrando que o limite máximo de criação de cards é 10, então o maior número será 10). Assim o último card criado aparecerá na última ordem do board

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
    "ordem": 1
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
    "mensagem": "O campo titulo é obrigatório"
}

// HTTP Status Code: 400
{
    "mensagem": "O campo board_id é obrigatório"
}

// HTTP Status Code: 400
{
    "mensagem": "O titulo do card só pode ter até 20 caracteres."
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

13. Edição de card: PUT /card/:id

_Descrição: Esta é a rota que será usada para editar um card._

#### Dados enviados

- Token de autenticação
- Parâmetro: de rota - ID do card a ser editado
- Body da requisição:
  - titulo
  - board_id

#### Dados retornados (status code 200)

- id
- titulo
- board_id
- ordem

#### Requisitos

- Validar se existe um board para o ID informado como url params
- Validar os campos obrigatórios:
  - titulo
  - board_id
- Validar se o titulo informado tem até 20 caracteres
- Validar se o existe o board informado
- Atualizar no banco de dados a data_de_atualizacao do board assim que os dados da requisição da edição de um card seu forem enviados
- Atualizar os dados do card no banco de dados
  - Lembrar de atualizar o número de ordem do card no banco de dados para indicar a posição que ele ocupa na página.

#### **Exemplos de requisição bem-sucedida**

**Entrada:**

```javascript=
       {
           board_id: 1,
           titulo: Cartão 1
       }
```

**Saida:**

```javascript=
      //status code 200
       {
           id: 1,
           titulo: Cartão 1,
           board_id: 1
           ordem: 1
       }
```

14. Exclusão de card: DELETE /card/:id

_Descrição: Esta é a rota que será usada para apagar um card._

#### Dados enviados

- Token de autenticação
- Parâmetro: de rota - ID do card a ser excluido

#### Dados retornados (status code 204)

- (Sem conteudo no Body)

#### Requisitos

- Validar se existe um card para o ID informado como url params
- Atualizar no banco de dados a data_de_atualizacao do board assim que os dados da requisição da exclusão de um card seu forem enviados
- Apagar o card no banco de dados

#### **Exemplos de requisição bem-sucedida**

**Entrada:**

```javascript=
    //Id do card passado pela query Params
    // DELETE /card/1
```

**Saida:**

```javascript=
     // 204 (No Content) = requisição bem sucedida, sem conteúdo no corpo da resposta
```

15. Criação de task: POST card/task

_Descrição: Esta é a rota que será usada para criar uma task no card._

#### Dados enviados

- Token de autenticação
- Parametro (nenhum)
- Body da requisição:
  - titulo
  - descricao
  - card_id

#### Dados retornados (status code 200)

- id
- titulo
- descricao
- card_id
- ordem

#### Requisitos

- Validar se existe um card para o card_id informado no body
- Validar os campos obrigatórios:
  - titulo
  - card_id
- Validar se o usuario não excedeu o limite de 20 tasks criadas por card
- Atualizar no banco de dados a data_de_atualizacao do board assim que os dados da requisição da exclusão de um card seu forem enviados
- Criar a task no banco de dados
  - Lembrar de registrar o número de ordem da task no banco de dados para indicar a posição que ele ocupa na página. Na criação da task, o número de ordem que lhe será atribuído é o maior dentre os já armazenados na coluna ordem da tabela task (lembrando que o limite máximo de criação de tasks é 20, então o maior número será 20). Assim a última task criada aparecerá na última ordem do card

#### **Exemplos de requisição bem-sucedida**

**Entrada**

```javascript=
    // POST card/1/task/
      {
          titulo: Tarefa 1,
          descricao: Fazer PR,
      }
```

**Saida:**

```javascript=
      //status code 201
      {
          id: 1,
          titulo: Tarefa 1,
          descricao: Fazer PR,
          card_id: 1
          ordem: 1
      }
```

16. Edição de task: PUT/task/:id

_Descrição: Esta é a rota que será usada para editar uma task no card._

#### Dados enviados

- Token de autenticação
- Parâmetro: de rota - ID da task a ser editada
- Body da requisição:
  - titulo
  - descricao
  - card_id

#### Dados retornados (status code 200)

- id
- titulo
- descricao
- card_id
- ordem

#### Requisitos

- Validar se existe uma task para o ID informado como url params
- Validar os campos obrigatórios:
  - titulo
- Validar se o titulo informado tem até 20 caracteres
- Atualizar no banco de dados a data_de_atualizacao do board assim que os dados da requisição da exclusão de um card seu forem enviados
- Atualizar os dados da task no banco de dados
  - Lembrar de atualizar o número de ordem da task no banco de dados

#### **Exemplos de requisição bem-sucedida**

**Entrada:**

```javascript=
      //ID passado por query params
      // /task/1
      {
          itulo: Tarefa 1 atualizada,
          descricao: Fazer PR,
          card_id: 1
      }
```

**Saida:**

```javascript=
      {
          id: 1,
          itulo: Tarefa 1 atualizada,
          descricao: Fazer PR,
          card_id: 1
          ordem: 1
      }
```

17. Detalhamento de task: GET/task/:id

_Descrição: Esta é a rota que será usada para detalhar/acessar uma task no card._

#### Dados enviados

- Token de autenticação
- Parâmetro: de rota - ID da task a ser detalhada
- Body da requisição (Sem conteudo)

#### Dados retornados (status code 200)

- id
- titulo
- descricao
- card_id
- ordem

#### Requisitos

- Validar se existe uma task para o ID informado como url params
- Exibir os dados da task vindo do banco de dados

#### **Exemplos de requisição bem-sucedida**

**Entrada:**

```javascript=
      //Id passado pela query params
```

**Saida:**

```javascript=
    {
          id: 1,
          itulo: Tarefa 1 atualizada,
          descricao: Fazer PR,
          card_id: 1,
          ordem: 1
    }
```

18. Exclusão de task: DELETE /task/:id

_Descrição: Esta é a rota que será usada para excluir uma task do card._

#### Dados enviados

- Token de autenticação
- Parâmetro: de rota - ID da task a ser excluida
- Body da requisição (Sem conteudo)

#### Dados retornados (status code 204)

- Sem conteudo retornado (Status code 204)

#### Requisitos

- Validar se existe uma task para o ID informado como url params
- Atualizar no banco de dados a data_de_atualizacao do board assim que os dados da requisição da exclusão de um card seu forem enviados
- Deletas a task do banco de dados

#### **Exemplos de requisição bem-sucedida**

**Entrada:**

```javascript=
  //Id passado na query params
  // task/1
```

**Saida:**

```javascript=
    //No content status code 204
```
