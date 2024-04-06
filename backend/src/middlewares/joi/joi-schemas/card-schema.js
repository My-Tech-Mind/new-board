import joi from 'joi';

const cardSchema = joi.object({
    title: joi.string().max(20).required().messages({
        'any.required': 'The title field is required.',
        'string.empty': 'The title field cannot be empty.',
        'string.base': 'The title field must be a text.',
        'string.max': 'The title field must be at most {#limit} characters long.'
    }),
    board_id: joi.number().positive().integer().required().messages({
        'any.required': 'The board_id field is required.',
        'number.base': 'The board_id field must be a number.',
        'number.positive': 'The board_id field must be a positive number',
        'number.integer': 'The board_id field must be an integer number'
    })
});

export { cardSchema };