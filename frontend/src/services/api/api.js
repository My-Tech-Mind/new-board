import axios from 'axios';

const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {'Authorization': `Bearer ${token}` }
});

api.interceptors.response.use(
    response => {
        return response;
    },
    async error => {
        if(error.response.status === 401) {
          localStorage.removeItem('token');
          window.location = "/login";
        } else{
            return error;
        }
    }
);

export { api };
