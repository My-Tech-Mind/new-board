import { useState } from "react";
import { api } from "../../services/api/api";
import createUser from "../../services/api/user/user";

const Teste = () => {

    const [user, setUser] = useState();
    const [token, setToken] = useState();

    // const createUser = async (userObj) => {

    //     await api.post('/user', userObj
    //     ).then(response => {
    //         setUser(response.data)
    //         return response.data
    //     }).catch(error => console.log(error.message))      
    // }
    
    const userObj = {
        name: "Novo Teste",
        email: "novoteste3@gmail.com",
        password: "Testando@123"
    }
    

    const loginUser = async () => {

        await api.post('/login', {
            email: "joaoteste8@gmail.com",
            password: "Testando@123" 
        }
        ).then(response => {
            setToken(response.data.token)
            localStorage.setItem('token', response.data.token)
        }).catch(error => console.log(error.message))      
    }

    const updateUser = async () => {

        await api.put('/user', {
            name: "João Atualizado",
            email: "joaoatualizado@gmail.com",
            password: "Testando@123" 
        }
        ).then(response => {
            setUser(response.data)
        }).catch(error => console.log(error.message))      
    }

    const createBoard = async () => {
        await api.post('/board', {
            title: "criado no front"
        }).then(response => {
            console.log(response.data)
        }).catch(error => console.log(error))
    }

    // const storageToken = localStorage.getItem('token')
    
    // console.log(user)
    // console.log(storageToken)

    return ( 
        <div>
            <button onClick={() => createUser(userObj)}>Cadastrar</button>
            <button onClick={loginUser}>Login</button>
            <button onClick={updateUser}>Update</button>
            <button onClick={createBoard}>Criar board</button>
        </div>
     );
}
 
export default Teste;