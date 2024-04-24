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
        console.log(error.message);
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
    createCard,
    updateCard,
    deleteCard,
    ordenateCard
};