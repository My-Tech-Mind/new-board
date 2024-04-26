import { connection as knex } from '../../database/connection.js';
import { refreshUpdateDateBoard } from '../../utils/refresh-update-date-board.js';

const ordenateCards = async (req, res) => {
    const { cardSourcePosition, cardDestinationPosition, cardId } = req.body;

    try {
        const card = await knex('cards').where({ id: cardId }).first();
        if (!card) {
            return res.status(404).json({ message: 'Card not found.' });
        }

        await knex.transaction(async trx => {
            if (cardDestinationPosition < cardSourcePosition) {
                const limitEditIncrement = Number(cardSourcePosition) - 1;
                await trx('cards')
                    .where({ id: cardId })
                    .update({ ordenation: -1 });

                await trx('cards')
                    .whereBetween('ordenation', [cardDestinationPosition, limitEditIncrement])
                    .increment('ordenation', 1);

                await trx('cards')
                    .where({ id: cardId })
                    .update({ ordenation: cardDestinationPosition });

            } else if (cardDestinationPosition > cardSourcePosition) {
                const limitEditDecrement = Number(cardSourcePosition) + 1;
                await trx('cards')
                    .where('ordenation', cardSourcePosition)
                    .update({ ordenation: -1 });

                await trx('cards')
                    .whereBetween('ordenation', [limitEditDecrement, cardDestinationPosition])
                    .decrement('ordenation', 1);

                await trx('cards')
                    .where('ordenation', -1)
                    .update({ ordenation: cardDestinationPosition });
            }

            refreshUpdateDateBoard(card.board_id);

            return res.sendStatus(204);
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export { ordenateCards };