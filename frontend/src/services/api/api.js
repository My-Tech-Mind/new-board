import axios from 'axios';

const token = localStorage.getItem("token");

const api = axios.create({
  baseURL: 'https://new-board-54mj.onrender.com',
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
