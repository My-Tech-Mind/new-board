import { joi } from 'joi';

const bodyCreateUser = joi.object({
    nome: joi.string().required().messages({
        'any.required': 'O campo nome é obrigatório.',
        'string.empty': 'O campo nome não pode ser vazio.'
    }),
    email: joi.string().email().required().messages({
        'any.required': 'O campo email é obrigatório.',
        'string.empty': 'O campo email não pode ser vazio.',
        'string.email': 'O campo email deve ser um email válido.'
    }),
    senha: joi.string().min(8).max(22).required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/).messages({
        'any.required': 'O campo senha é obrigatório.',
        'string.empty': 'O campo senha não pode ser vazio.',
        'string.pattern.base': 'A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, um número e um símbolo.'
    })
});

export {bodyCreateUser}
