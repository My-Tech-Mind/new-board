import joi from "joi";

const ordenateTasksSchema = joi.object({
    taskDestinationPosition: joi.number().required().messages({
        'any.required': 'The taskDestinationPosition field is required.',
        'string.empty': 'The taskDestinationPosition field cannot be empty.',
        'number.base': 'The taskDestinationPosition field must be a number.',
    }),
    taskSourcePosition: joi.number().required().messages({
        'any.required': 'The taskSourcePosition field is required.',
        'string.empty': 'The taskSourcePosition field cannot be empty.',
        'number.base': 'The taskSourcePosition field must be a number.',
    }),
    cardIdSource: joi.number().required().messages({
        'any.required': 'The cardIdSource field is required.',
        'string.empty': 'The cardIdSource field cannot be empty.',
        'number.base': 'The cardIdSource field must be a number.',
    }),
    cardIdDestination: joi.number().required().messages({
        'any.required': 'The cardIdDestination field is required.',
        'string.empty': 'The cardIdDestination cannot be empty.',
        'number.base': 'The cardIdDestination must be a number.',
    }),
    taskId: joi.number().required().messages({
        'any.required': 'The taskId field is required.',
        'string.empty': 'The taskId cannot be empty.',
        'number.base': 'The taskId must be a number.',
    })
});

export { ordenateTasksSchema };