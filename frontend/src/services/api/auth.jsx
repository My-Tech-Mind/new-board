import { api } from './api';

const login = async (data) =>{
	try{
		return await api.post('/login', {email: data.email, password: data.password});
		// alert(logged)
		// return logged;
	}catch(error){
		return error;
	}
}

const logOut = () => {
	try{
		localStorage.removeItem('token');
		window.location = "/login";
	} catch(error){
		
	}
}

const isAuthenticated = ()=> {
	const token = localStorage.getItem("token");
	if(!token){
		return false;
	}
	return true;
}

export { isAuthenticated, login, logOut };