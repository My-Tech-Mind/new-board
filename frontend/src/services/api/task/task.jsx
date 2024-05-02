import { api } from "../api"

const createTask = async (task) => {
    try {
        const response = await api.post('/task', task)
        return response.data
    } catch (error) {
<<<<<<< HEAD
        console.log(error.message)
=======
        console.log(error)
>>>>>>> 0fa81851cfb70329104edc706937917542abb70c
    }
}

const deleteTask = async (id) => {
    try {
        const response = await api.delete(`/task/${id}`)
        return response.data
    } catch (error) {
        console.log(error.message)
    }
}

const updateTask = async (id, task) => {
    try {
        const response = await api.put(`task/${id}`, task)
<<<<<<< HEAD
=======
        console.log(response)
>>>>>>> 0fa81851cfb70329104edc706937917542abb70c
        return response.data
    } catch (error) {
        console.log(error.message)
    }
}

const ordenateTask = async (taskOrdenation) => {
    try {
        const response = await api.put(`task/ordenation`, taskOrdenation)
        return response.data
    } catch (error) {
<<<<<<< HEAD
        console.log(error.message)
=======
        console.log(error)
>>>>>>> 0fa81851cfb70329104edc706937917542abb70c
    }
}

const getTask = async (id) => {
    try {
        const response = await api.get(`task/${id}`)
        return response.data
    } catch (error) {
        console.log(error.message)
    }
}

export {
    getTask,
    createTask,
    updateTask,
    ordenateTask,
    deleteTask
}