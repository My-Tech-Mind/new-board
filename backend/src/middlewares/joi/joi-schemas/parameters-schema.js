import joi from 'joi';

const paramsSchema = joi.object({
    id: joi.number().positive().integer().messages({
        'number.base': 'The id must be a number',
        'number.positive': 'The id must be a positive number',
        'number.integer': 'The id must be an integer number'
    })
});

const querySchema = joi.object({
    favorited: joi.boolean().valid(true).optional().messages({
        'any.only': 'The favorited query parameter must be informed as a true value'
    })
});

export { paramsSchema, querySchema };