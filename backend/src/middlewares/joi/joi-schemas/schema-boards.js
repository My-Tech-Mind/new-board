import joi from 'joi';

const schemaBoard = joi.object({
    title: joi.string().required().messages({
        'any.required': 'The title field is required.',
        'string.empty': 'The title field cannot be empty.'
    }),
    favorite: joi.boolean().optional().messages({
        'boolean.base': 'The favorite field must be a boolean.'
    })
});

export { schemaBoard };
