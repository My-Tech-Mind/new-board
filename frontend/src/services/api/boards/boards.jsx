import { api } from "../api";

const listBoards = async () => {
<<<<<<< HEAD
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzEzMTEzNDU0LCJleHAiOjE3MTMxOTk4NTR9.tkEDMcW2fObTqdzfgWreOBWL5YvvlUddpPyTJo2Av7A');
    try {
        let response = await api.get('./board');
        return response.data;
=======
    try {
        let response = await api.get('/board');
        return response;
>>>>>>> 0fa81851cfb70329104edc706937917542abb70c
    } catch (error) {
        console.log(error.message)
    }
}


const createBoards = async (boards) => {
<<<<<<< HEAD
    // localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzEzMTA5MjQ1LCJleHAiOjE3MTMxOTU2NDV9.uX2Ow9T3OMJG1FKRQdt4Rq7owrwekagizngHHGrSaSQ')
    try {
        const response = await api.post('/board', boards)
        console.log('resp', response.data);
        return response.data
=======
    try {
        const response = await api.post('/board', boards)
        return response;
>>>>>>> 0fa81851cfb70329104edc706937917542abb70c
    } catch (error) {
        console.log(error.message)
    }
}

const updateBoards = async (id, boards) => {
    try {
        const response = await api.put(`/board/${id}`, boards)
<<<<<<< HEAD
        console.log(response.data)
        return response.data
=======
        return response;
>>>>>>> 0fa81851cfb70329104edc706937917542abb70c
    } catch (error) {
        console.log(error.message)
    }
}

const deleteBoards = async (id) => {
    try {
        const response = await api.delete(`/board/${id}`)
<<<<<<< HEAD
        console.log(response.data)
        return response.data
    } catch (error) {

=======
        return response;
    } catch (error) {
        console.log(error.message)
>>>>>>> 0fa81851cfb70329104edc706937917542abb70c
    }
}

export {
    createBoards,
    updateBoards,
    deleteBoards,
    listBoards
<<<<<<< HEAD
    //,
    // ordenateCard
=======
>>>>>>> 0fa81851cfb70329104edc706937917542abb70c
}