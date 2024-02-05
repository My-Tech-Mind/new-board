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
 15) Exclusão de card: DELETE /card/:id

*Descrição: Esta é a rota que será usada para apagar um card.*

     **Entrada:**
     ```javascript=
        //Id do card passado pela querry Params 
     ```
        **Saida:**
        ```javascript=
                // 204 (No Content) = requisição bem sucedida, sem conteúdo no corpo da resposta
        ```
17) Criação de task: POST /task/:id
    
*Descrição: Esta é a rota que será usada para criar uma task no card.*

     **Entrada**
    ```javascript=
        {
            titulo: Tarefa 1,
            descricao: Fazer PR,
            card_id: 1
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
19) Edição de task: PUT/task/:id

*Descrição: Esta é a rota que será usada para editar uma task no card.*

     **Entrada:**
    ```javascript=
        //ID passado por query params
        {
            itulo: Tarefa 1 atualizada,
            descricao: Fazer PR,
            card_id: 1
        }
    ```
    **Saida:**
    ```javascript=
        //ID passado por query params
        {
            id: 1,
            itulo: Tarefa 1 atualizada,
            descricao: Fazer PR,
            card_id: 1
        }
    ```
21) Detalhamento de task: GET/task/:id

*Descrição: Esta é a rota que será usada para detalhar/acessar uma task no card.*

     **Entrada:**
    ```javascript=
        //Id passado pela query params
    ```
    **Saida:**
    ```javascript=
        id: 1,
        titulo: Tarefa 1 atualizada,
        descricao: Fazer PR,
        card_id: 1
    ```
23) Exclusão de task: DELETE /task/:id

*Descrição: Esta é a rota que será usada para excluir uma task do card.*

    **Entrada:**
    ```javascript=
        //Id passado na query params
    ```
    **Saida:**
    ```javascript=
        //No content status code 204
    ```


