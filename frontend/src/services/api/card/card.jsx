import { api } from "../api"

const createCard = async (card) => {
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzEyNjY3MzEyLCJleHAiOjE3MTI3NTM3MTJ9.I5pgyfSoI900N_k3l22CqwBWvARytZ6Lazi0MFOLFXY')

    await api.post('/card', card)
        .then(response => {
            console.log(response.data)
            return response.data
        }).catch(error => error.data)
}

const updateCard = async (card) => {
    await api.put(`/card/${card.id}`, card)
        .then(response => {
            console.log(response.data)
            return response.data
    }).catch(error => console.log(error))
}

const deleteCard = async (id) => {
    await api.delete('/card/id')
        .then(response => {
            console.log(response.data)
            return response.data
    }).catch(error => console.log(error))
}

const ordenateCard = async (card) => {
    await api.put('/card/ordenation', card)
        .then(response => {
            console.log(response.data)
            return response.data
    }).catch(error => console.log(error))
}

export {
    createCard,
    updateCard,
    deleteCard,
    ordenateCard
}