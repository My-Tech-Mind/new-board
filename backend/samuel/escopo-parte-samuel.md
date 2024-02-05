13) Edição de card: PUT /card/:id
     **Entrada:**
     ```javascript=
         {
             board_id: number,
             titulo: String
         }
     ```
     **Saida:**
     ```javascript=
        //status code 201
         {
             id: Number,
             titulo: String,
             board_id: Number
         }
     ```
 14) Exclusão de card: DELETE /card/:id
     **Entrada:**
     ```javascript=
        //Id do card passado pela querry Params 
     ```
        **Saida:**
        ```javascript=
                // 204 (No Content) = requisição bem sucedida, sem conteúdo no corpo da resposta
        ```
15) Criação de task: POST /task/:id
*Descrição: Esta é a rota que será usada para criar uma task no card.*
    **Entrada**
    ```javascript=
        {
            titulo: String,
            descricao: string,
            card_id: Number
        }
    ```
    **Saida:**
    ```javascript=
        //status code 201
        {
            id: Noumber,
            titulo: String,
            descricao: string,
            card_id: Number
        }
    ```
16) Edição de task: PUT/task/:id
*Descrição: Esta é a rota que será usada para editar uma task no card.*
    **Entrada:**
    ```javascript=
        //ID passado por query params
        {
            itulo: String,
            descricao: String,
            card_id: Number
        }
    ```
    **Saida:**
    ```javascript=
        //ID passado por query params
        {
            id: Number,
            itulo: String,
            descricao: String,
            card_id: Number
        }
    ```
17) Detalhamento de task: GET/task/:id
*Descrição: Esta é a rota que será usada para detalhar/acessar uma task no card.*
    **Entrada:**
    ```javascript=
        //Id passado pela query params
    ```
    **Saida:**
    ```javascript=
        id: Number,
        titulo: String,
        descricao: String,
        card_id: Number
    ```
18) Exclusão de task: DELETE /task/:id
*Descrição: Esta é a rota que será usada para excluir uma task do card.*
    **Entrada:**
    ```javascript=
        //Id passado na query params
    ```
    **Saida:**
    ```javascript=
        //No content status code 204
    ```


