import axios from 'axios';

const token = localStorage.getItem("token");

const api = axios.create({
<<<<<<< HEAD
  baseURL: 'http://localhost:3001',
  headers: {'Authorization': `Bearer ${token}` }
});

=======
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

>>>>>>> 0fa81851cfb70329104edc706937917542abb70c
export { api };
