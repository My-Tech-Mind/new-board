import joi from "joi";

const ordenateCardsSchema = joi.object({
    cardIdSourcePosition: joi.number().required().messages({
        'any.required': 'The cardIdSourcePosition field is required.',
        'string.empty': 'The cardIdSourcePosition field cannot be empty.',
        'number.base': 'The cardIdSourcePosition field must be a number.',
    }),
    cardIdDestinationPosition: joi.number().required().messages({
        'any.required': 'The cardIdDestinationPosition field is required.',
        'string.empty': 'The cardIdDestinationPosition field cannot be empty.',
        'number.base': 'The cardIdDestinationPosition field must be a number.',
    }),
    cardId: joi.number().required().messages({
        'any.required': 'The cardId field is required.',
        'string.empty': 'The cardId field cannot be empty.',
        'number.base': 'The cardId field must be a number.',
    })
});

export { ordenateCardsSchema };