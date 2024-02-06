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
    nome: 'Bonates',
    email: 'bonates@email.com',
    senha: 'senha123'
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

```javascript
//status code 401

{
    mensagem: `O ${email} informado já existe`
}

```

```javascript
// status code 400

{
    mensagem: `Formato de ${email} inválido`
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
    email: 'bonates@email.com'
    senha: 'senha3241'
}

```
**Exemplo de requisição mal sucedida:**

```javascript
//status code: 401

{
    mensagem: `O email ou a senha estão incorretos`
}

```


```javascript
//status code: 400
{
    mensagem: `O campo ${campo} é obrigatório.`
}
```


```javascript
//status code: 400
{
    mensagem: `O campo ${campo} tem que ser uma string`
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
        nome: 'Bonates',
        email: 'bonates@email.com'

    },

    {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    }
]

```


# ATENÇÃO: Todas as rotas a seguir exigem que o usuário esteja logado para acessá-las.

### Listar usuário logado: GET/user

**Descrição: Esta é a rota que será usada para exibir os dados do usuário logado.**

**Dados enviados:**

- token no formato bearer token no cabeçalho da requisição.

```javascript
{
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
}
```

**Critérios de aceite:**
- O usuário precisa estar logado no sistema.

**Exemplo de requisição mal sucedida:**

```javascript
//status code 401

{
    mensagem: `Não autorizado`
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
{
    nome: 'igor',
    email: 'bonates@email.com',
    senha: 'senha321'
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
    mensagem: `Não autorizado`
}
```

```javascript
//status code 401

{
    mensagem: `O email informado já pertence a outro usuário`
}
```

```javascript
//status code 400

{
    mensagem: `O campo ${campo} tem que ser do tipo string`
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




