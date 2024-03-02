const createCard = async (req, res) => {
    const { title, board_id } = req.body;

    try {
        const boardExists = await knex('boards').where('id', board_id).first();
        if (!boardExists) {
            return res.status(404).json({ message: 'Board not found' });
        }


        const boardCards = await knex('cards').where('board_id', board_id);
        if (boardCards.length >= 10) {
            return res.status(400).json({ message: 'Maximum number of cards per board reached' });
        }

        await knex('boards').where('id', board_id).update({ update_date: knex.fn.now() });

        
        const [newCard] = await knex('cards').insert({ title, board_id, ordenation: boardCards.length + 1 }).returning('*');

        return res.status(201).json(newCard);
    } catch (error) {
    
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export { createCard };