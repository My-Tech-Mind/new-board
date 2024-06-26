import { connection as knex } from '../../database/connection.js';
import { refreshUpdateDateBoard } from '../../utils/refresh-update-date-board.js';

const ordenateTasks = async (req, res) => {
    const { taskSourcePosition, taskDestinationPosition, cardIdDestination, cardIdSource, taskId } = req.body;

    try {
        const task = await knex('tasks').where({ id: taskId }).first();
        if (!task) {
            return res.status(404).json({ message: 'Task not found.' });
        }

        const card = await knex('cards').where({ id: cardIdDestination }).first();
        if (!card) {
            return res.status(404).json({ message: `Card with cardIdDestination = ${cardIdDestination} was not found.` })
        }

        const numberOfTasks = await knex('tasks').where({ card_id: cardIdDestination });
        if (numberOfTasks.length > 20) {
            return res.status(403).json({
                message: `Alert: The maximum number of tasks (20) for this card has been reached.
                New tasks cannot be added to this card due to this limit.`
            });
        }

        if (cardIdSource !== cardIdDestination) {
            await knex('tasks').where({ id: taskId }).update({ card_id: cardIdDestination });
        }

        await knex.transaction(async trx => {
            if (taskDestinationPosition < taskSourcePosition && cardIdSource === cardIdDestination) {
                const limitEditIncrement = Number(taskSourcePosition) - 1;
                await trx('tasks')
                    .where({ id: taskId })
                    .where({ card_id: cardIdDestination })
                    .update({ ordenation: -1 });

                await trx('tasks')
                    .whereBetween('ordenation', [taskDestinationPosition, limitEditIncrement])
                    .where({ card_id: cardIdDestination })
                    .increment('ordenation', 1);

                await trx('tasks')
                    .where('ordenation', -1)
                    .where({ card_id: cardIdDestination })
                    .update({ ordenation: taskDestinationPosition });

            } else if (taskDestinationPosition < taskSourcePosition && cardIdSource !== cardIdDestination) {
                const limitEditDecrement = Number(taskSourcePosition) + 1;
                await trx('tasks')
                    .where({ id: taskId })
                    .where({ card_id: cardIdDestination })
                    .update({ ordenation: -1 });

                await trx('tasks')
                    .whereBetween('ordenation', [taskDestinationPosition, 20])
                    .where({ card_id: cardIdDestination })
                    .increment('ordenation', 1);

                await trx('tasks')
                    .where('ordenation', -1)
                    .where({ card_id: cardIdDestination })
                    .update({ ordenation: taskDestinationPosition });

                await trx('tasks')
                    .whereBetween('ordenation', [limitEditDecrement, 20])
                    .where({ card_id: cardIdSource })
                    .decrement('ordenation', 1);

            } else if (taskDestinationPosition > taskSourcePosition && cardIdSource === cardIdDestination) {
                const limitEditDecrement = Number(taskSourcePosition) + 1;
                await trx('tasks')
                    .where({ id: taskId })
                    .where({ card_id: cardIdDestination })
                    .update({ ordenation: -1 });

                await trx('tasks')
                    .whereBetween('ordenation', [limitEditDecrement, taskDestinationPosition])
                    .where({ card_id: cardIdDestination })
                    .decrement('ordenation', 1);

                await trx('tasks')
                    .where({ id: taskId })
                    .where({ card_id: cardIdDestination })
                    .update({ ordenation: taskDestinationPosition });

            } else if (cardIdSource !== cardIdDestination && taskDestinationPosition === taskSourcePosition) {
                const limitEditDecrement = Number(taskSourcePosition) + 1;
                await trx('tasks')
                    .where({ id: taskId })
                    .where({ card_id: cardIdDestination })
                    .update({ ordenation: -1 });

                await trx('tasks')
                    .whereBetween('ordenation', [taskSourcePosition, 20])
                    .where({ card_id: cardIdDestination })
                    .increment('ordenation', 1);

                await trx('tasks')
                    .where('ordenation', -1)
                    .where({ card_id: cardIdDestination })
                    .update({ ordenation: taskDestinationPosition });

                await trx('tasks')
                    .whereBetween('ordenation', [limitEditDecrement, 20])
                    .where({ card_id: cardIdSource })
                    .decrement('ordenation', 1);

            } else if (cardIdSource !== cardIdDestination && taskDestinationPosition > taskSourcePosition) {
                const limitEditDecrement = Number(taskDestinationPosition);
                await trx('tasks')
                    .whereBetween('ordenation', [limitEditDecrement, 20])
                    .where({ card_id: cardIdDestination })
                    .increment('ordenation', 1);

                await trx('tasks')
                    .where({ id: taskId })
                    .where({ card_id: cardIdDestination })
                    .update({ ordenation: taskDestinationPosition });

                await trx('tasks')
                    .whereBetween('ordenation', [limitEditDecrement, 20])
                    .where({ card_id: cardIdSource })
                    .decrement('ordenation', 1);

                await trx('tasks')
                    .whereBetween('ordenation', [Number(taskSourcePosition) +1, 20])
                    .where({ card_id: cardIdSource })
                    .decrement('ordenation', 1);
            }

            refreshUpdateDateBoard(card.board_id);

            return res.sendStatus(204);
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export { ordenateTasks };