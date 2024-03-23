import joi from 'joi';

const boardSchema = joi.object({
    title: joi.string().max(20).required().messages({
        'any.required': 'The title field is required.',
        'string.empty': 'The title field cannot be empty.',
        'string.max': 'The title field must be at most {#limit} characters long.'
    }),
    favorited: joi.boolean().optional().messages({
        'boolean.base': 'The favorite field must be a boolean.'
    })
});

export { boardSchema };
