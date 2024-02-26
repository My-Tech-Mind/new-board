import joi from 'joi';

const taskSchema = joi.object({
    title: joi.string().max(50).required().messages({
        'any.required': 'The title field is required.',
        'string.empty': 'The title field cannot be empty.',
        'string.base': 'The title field must be a text.',
        'string.max': 'The title field must be at most {#limit} characters long.'
    }),
    description: joi.string().optional().max(1000).messages({
        'string.empty': 'The description field cannot be empty.',
        'string.base': 'The description field must be a text.',
        'string.max': 'The description field must be at most {#limit} characters long.'
    }),
    card_id: joi.number().positive().integer().required().messages({
        'any.required': 'The card_id field is required.',
        'number.base': 'The card_id field must be a number.',
        'number.positive': 'The card_id field must be a positive number',
        'number.integer': 'The card_id field must be an integer number'
    }),
    ordenation: joi.number().positive().integer().required().messages({
        'any.required': 'The card_id field is required.',
        'number.base': 'The card_id field must be a number.',
        'number.positive': 'The card_id field must be a positive number',
        'number.integer': 'The card_id field must be an integer number'
    })
});

export { taskSchema };
