import { api } from '../api';

const createAccount = async (data) =>{
	try{
		const signup = await api.post('/user', {email: data.email, password: data.password, name: data.name});
		return signup;
	}catch(error){
		return error;
	}
}

export { createAccount };