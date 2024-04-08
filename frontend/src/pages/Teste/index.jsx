import { useState } from "react";
import { api } from "../../services/api/api";


const Teste = () => {

    const [user, setUser] = useState()
    const createUser = async () => {

        const response = await api.post('/user', {
            name: "João",
            email: "joaoteste7@gmail.com",
            password: "Testando@123" 
        }
        ).then(error => console.log(error.message))
        setUser(response)
    }

    console.log(user)

    return ( 
        <div>
            <button onClick={createUser}>Cadastrar</button>
        </div>
     );
}
 
export default Teste;