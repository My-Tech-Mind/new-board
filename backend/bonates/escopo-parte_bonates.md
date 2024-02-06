# PARTE BONATES

- Login de usuário
- Cadastro de usuário
- Listar usuário Logado
- Atualizar usuário
- Excluir usuário
- Criar Board

---

## Cadastro e login de usuário

### Cadastro de usuário POST/user

**Descrição: Esta é a rota que será usada para cadastrar um usuário no sistema.**

- Será enviado um objeto no formato JSON com nome, email e senha.




```javascript
//Dados enviados:

{
    nome: 
    email:
    senha:
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
    mensagem: `O campo ${campo} é obrigatório` 
}

```

```javascript
//status code 400
{
    mensagem: `O campo ${campo} tem que ser uma string`
}
```

**Em caso de requisição bem sucedida:**

- Criptografar Senha e inseri-la no banco de dados.

- Retornar:
    - id
    - nome
    - email



**Exemplo de requisição bem sucedida:**


```javascript
//status code 201

{
    id:
    nome:
    email:
}

```

