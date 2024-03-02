import { connection as knex } from '../../database/connection.js';

const createCard = async (req, res) => {
    const { title, board_id } = req.query;

    try {
        await knex('cards').insert({ title, board_id });

        const [newCard] = await knex('cards').where({ title, board_id });

        return res.status(201).json(newCard);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export {createCard}