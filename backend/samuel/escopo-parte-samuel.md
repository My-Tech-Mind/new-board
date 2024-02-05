13) Edição de card: PUT /card/:id
    
     **Entrada:**
     ```javascript=
         {
             board_id: 1,
             titulo: Cartão 1
         }
     ```
     **Saida:**
     ```javascript=
        //status code 201
         {
             id: 1,
             titulo: Cartão 1,
             board_id: 1
         }
     ```
 15) Exclusão de card: DELETE /card/:id

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


