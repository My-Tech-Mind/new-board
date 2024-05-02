<<<<<<< HEAD
import { api } from "../api"

const createCard = async (card) => {
    // localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzEyNjY3MzEyLCJleHAiOjE3MTI3NTM3MTJ9.I5pgyfSoI900N_k3l22CqwBWvARytZ6Lazi0MFOLFXY')
    try {
        const response = await api.post('/card', card)
        console.log('resp', response.data)
        return response.data
    } catch (error) {
        console.log(error.message);
    }
}

const updateCard = async (id, card) => {
    try {
        const response = await api.put(`/card/${id}`, card)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error.message)
    }
}

const deleteCard = async (id) => {
    try {
        const response = await api.delete(`/card/${id}`)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error.message)
    }
}

const ordenateCard = async (card) => {
    try {
        const response = await api.put('/card/ordenation', card)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error.message)
    }
    // await api.put('/card/ordenation', card)
    //     .then(response => {
    //         console.log(response.data)
    //         return response.data
    // }).catch(error => console.log(error))
}

export {
=======
import { api } from "../api";

const detailCard = async (id) => {
    try {
        const response = await api.get(`/card/${id}`);
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
};
const createCard = async (card) => {
    try {
        const response = await api.post('/card', card);
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
};

const updateCard = async (id, card) => {
    try {
        const response = await api.put(`/card/${id}`, card);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

const deleteCard = async (id) => {
    try {
        const response = await api.delete(`/card/${id}`);
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
};

const ordenateCard = async (card) => {
    try {
        const response = await api.put('/card/ordenation', card);
        return response.data;
    } catch (error) {
        console.log(error.message);
    }
};

export {
    detailCard,
>>>>>>> 0fa81851cfb70329104edc706937917542abb70c
    createCard,
    updateCard,
    deleteCard,
    ordenateCard
<<<<<<< HEAD
}
=======
};
>>>>>>> 0fa81851cfb70329104edc706937917542abb70c
