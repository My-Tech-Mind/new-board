import { api } from "../api"

const createTask = async (task) => {
    try {
        const response = await api.post('/task', task)
        return response.data
    } catch (error) {
        console.log(error.message)
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
        console.log(error)
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