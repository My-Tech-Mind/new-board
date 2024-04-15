import { api } from "../api";

const listBoards = async () => {
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzEzMjA3Mzc3LCJleHAiOjE3MTMyOTM3Nzd9.oJRZx25YpvP_I_ayhS9I1FQNBGrRPHasttYTFKCPAHA');
    try {
        let response = await api.get('/board');
        return response.data;
    } catch (error) {
        console.log(error.message)
    }
}


const createBoards = async (boards) => {
    // localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzEzMTA5MjQ1LCJleHAiOjE3MTMxOTU2NDV9.uX2Ow9T3OMJG1FKRQdt4Rq7owrwekagizngHHGrSaSQ')
    try {
        const response = await api.post('/board', boards)
        console.log('resp', response.data);
        return response.data
    } catch (error) {
        console.log(error.message)
    }
}

const updateBoards = async (id, boards) => {
    try {
        const response = await api.put(`/board/${id}`, boards)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error.message)
    }
}

const deleteBoards = async (id) => {
    try {
        const response = await api.delete(`/board/${id}`)
        console.log(response.data)
        return response.data
    } catch (error) {

    }
}

export {
    createBoards,
    updateBoards,
    deleteBoards,
    listBoards
    //,
    // ordenateCard
}