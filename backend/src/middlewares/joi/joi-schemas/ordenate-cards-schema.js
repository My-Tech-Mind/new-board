import joi from "joi";

const ordenateCardsSchema = joi.object({
    cardSourcePosition: joi.number().required().messages({
        'any.required': 'The cardSourcePosition field is required.',
        'string.empty': 'The cardSourcePosition field cannot be empty.',
        'number.base': 'The cardIdSourcePosition field must be a number.',
    }),
    cardDestinationPosition: joi.number().required().messages({
        'any.required': 'The cardDestinationPosition field is required.',
        'string.empty': 'The cardDestinationPosition field cannot be empty.',
        'number.base': 'The cardDestinationPosition field must be a number.',
    }),
    cardId: joi.number().required().messages({
        'any.required': 'The cardId field is required.',
        'string.empty': 'The cardId field cannot be empty.',
        'number.base': 'The cardId field must be a number.',
    })
});

export { ordenateCardsSchema };