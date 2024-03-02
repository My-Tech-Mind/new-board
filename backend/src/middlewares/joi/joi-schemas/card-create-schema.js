import joi from 'joi';

const createCardSchema = joi.object({
    title: joi.string().max(20).required().messages({
        'any.required': 'O campo título é obrigatório.',
        'string.empty': 'O campo título não pode estar vazio.',
        'string.base': 'O campo título deve ser um texto.',
        'string.max': 'O campo título deve ter no máximo {#limit} caracteres.'
    }),
    board_id: joi.number().positive().integer().required().messages({
        'any.required': 'O campo board_id é obrigatório.',
        'number.base': 'O campo board_id deve ser um número.',
        'number.positive': 'O campo board_id deve ser um número positivo.',
        'number.integer': 'O campo board_id deve ser um número inteiro.'
    })
});

export {createCardSchema}