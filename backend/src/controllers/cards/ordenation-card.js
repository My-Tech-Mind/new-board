import { connection as knex } from '../../database/connection.js';
import { refreshUpdateDateBoard } from '../../utils/refresh-update-date-board.js';

const ordenationCards = async (req, res) => {
	const { cardIdSourcePosition, cardIdDestinationPosition, cardId } = req.body;
	const limitEditIncrement = cardIdSourcePosition - 1;
	try{

		await knex.transaction(async trx => {
			if (cardIdDestinationPosition === cardIdSourcePosition) {
				return res.status(403).json({ message: 'The new position cannot be the same as the current one'})
			}
		  try {
		  	if (cardIdDestinationPosition < cardIdSourcePosition) {
			    await trx('cards')
			      .where({ id: cardId })
			      .update({ ordenation: -1 });

			    await trx('cards')
			      .whereBetween('ordenation', [cardIdDestinationPosition, limitEditIncrement])
			      .increment('ordenation', 1);

			    await trx('cards')
			      .where({ id: cardId })
			      .update({ ordenation: cardIdDestinationPosition });

		  	} else{
		  		const limitEditDecrement = Number(cardIdSourcePosition) + 1;
			    await trx('cards')
			      .where('ordenation', cardIdSourcePosition)
			      .update({ ordenation: -1 });

			    await trx('cards')
			      .whereBetween('ordenation', [limitEditDecrement, cardIdDestinationPosition])
			      .decrement('ordenation', 1);

			    await trx('cards')
			      .where('ordenation', -1)
			      .update({ ordenation: cardIdDestinationPosition });
		  	}
		    return res.status(200).json()
		  } catch (error) {
		  		return res.status(500).json({ message: ' Internal server error' });
		  }
		});
	}catch(error){
		return res.status(500).json({ message: 'Internal server error' });
	}
};

export { ordenationCards };