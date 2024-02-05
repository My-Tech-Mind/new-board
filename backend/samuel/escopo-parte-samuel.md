# PARTE SAMUEL

13. Edição de card
14. Listagem de boards
15. Listagem de boards favoritos
16. Detalhamento de board
17. Excluir board
18. Criação de card

---
13) Edição de card: PUT /card/:id

*Descrição: Esta é a rota que será usada para editar um card.*

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

#### Requisitos

- Validar se existe um board para o ID informado como query params
- Validar os campos obrigatórios:
  - titulo
  - board_id
- Validar se o titulo informado tem até 20 caracteres
- Validar se o existe o board informado
- Atualizar os dados do card no banco de dados

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
         }
  ```
 14) Exclusão de card: DELETE /card/:id

*Descrição: Esta é a rota que será usada para apagar um card.*

#### Dados enviados

- Token de autenticação
- Query params - ID do board a ser editado

#### Dados retornados (status code 204)

- (Sem conteudo no Body)

#### Requisitos

- Validar se existe um card para o ID informado como query params
- Apagar o card no banco de dados

#### **Exemplos de requisição bem-sucedida**

  **Entrada:**
  ```javascript=
      //Id do card passado pela querry Params 
      // DELETE /card/1
  ```
  **Saida:**
  ```javascript=
       // 204 (No Content) = requisição bem sucedida, sem conteúdo no corpo da resposta
  ```
15) Criação de task: POST card/1/task/
    
*Descrição: Esta é a rota que será usada para criar uma task no card.*

#### Dados enviados

- Token de autenticação
- Query params - ID do card em que a task vai ser criada
- Body da requisição:
  - titulo
  - descricao

#### Dados retornados (status code 200)

- id
- titulo
- descricao
- card_id

#### Requisitos

- Validar se existe um board para o ID informado como Query params
- Validar os campos obrigatórios:
  - titulo
- Criar a task no banco de dados

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
        }
  ```
16) Edição de task: PUT /task/:id

*Descrição: Esta é a rota que será usada para editar uma task no card.*

#### Dados enviados

- Token de autenticação
- Query params - ID da task a ser editada
- Body da requisição:
  - titulo
  - descricao
  - card_id

#### Dados retornados (status code 200)

- id
- titulo
- descricao
- card_id

#### Requisitos

- Validar se existe uma task para o ID informado como Query params
- Validar os campos obrigatórios:
  - titulo
- Validar se o titulo informado tem até 20 caracteres
- Atualizar os dados da task no banco de dados

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
        }
  ```
17) Detalhamento de task: GET/task/:id

*Descrição: Esta é a rota que será usada para detalhar/acessar uma task no card.*

#### Dados enviados

- Token de autenticação
- Parâmetro: de rota - ID da task a ser detalhada
- Body da requisição (Sem conteudo)

#### Dados retornados (status code 200)

- id
- titulo
- descricao
- card_id

#### Requisitos

- Validar se existe uma task para o ID informado como Query params
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
            card_id: 1
      }
  ```
18) Exclusão de task: DELETE /task/:id

*Descrição: Esta é a rota que será usada para excluir uma task do card.*

#### Dados enviados

- Token de autenticação
- Parâmetro: de rota - ID da task a ser excluida
- Body da requisição (Sem conteudo)
#### Dados retornados (status code 204)

- Sem conteudo retornado (Status code 204)

#### Requisitos

- Validar se existe uma task para o ID informado como query params
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


