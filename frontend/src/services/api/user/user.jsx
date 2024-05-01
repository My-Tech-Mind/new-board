import { api } from "../api";

    const createUser = async (userObj) => {
        await api.post('/user', userObj
        ).then(response => {
            console.log(response.data)
            return response.data
        }).catch(error => console.log(error))      
    }
 
export default createUser;