import { api } from "../api"

const getUser = async (user) => {
    try {
        const response = await api.get('/user', user)
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error.message)
    }
}

const updateUser = async (user) => {
    try {
        const response = await api.put('/user', user)
        return response.data
    } catch (error) {
        console.log(error)
    }
}

const deleteUser = async () => {
    try {
        const response = await api.delete('/user')
        console.log(response.data)
        return response.data
    } catch (error) {
        console.log(error.message)
    }
}

export {
    updateUser,
    deleteUser,
    getUser
}