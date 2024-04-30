import { api } from "../api";

const listBoards = async () => {
    try {
        let response = await api.get('/board');
        return response;
    } catch (error) {
        console.log(error.message)
    }
}


const createBoards = async (boards) => {
    try {
        const response = await api.post('/board', boards)
        return response;
    } catch (error) {
        console.log(error.message)
    }
}

const updateBoards = async (id, boards) => {
    try {
        const response = await api.put(`/board/${id}`, boards)
        return response;
    } catch (error) {
        console.log(error.message)
    }
}

const deleteBoards = async (id) => {
    try {
        const response = await api.delete(`/board/${id}`)
        return response;
    } catch (error) {
        console.log(error.message)
    }
}

export {
    createBoards,
    updateBoards,
    deleteBoards,
    listBoards
}