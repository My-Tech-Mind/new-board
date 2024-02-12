import { joi } from 'joi';

const bodyCreateUser = joi.object({
    name: joi.string().required().messages({
        'any.required': 'The name field is required.',
        'string.empty': 'The name field cannot be empty.'
    }),
    email: joi.string().email().required().messages({
        'any.required': 'The email field is required.',
        'string.empty': 'The email field cannot be empty.',
        'string.email': 'The email field must be a valid email address.'
    }),
    password: joi.string().min(8).max(22).required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/).messages({
        'any.required': 'The password field is required.',
        'string.empty': 'The password field cannot be empty.',
        'string.pattern.base': 'The password must have at least 8 characters, one uppercase letter, one digit, and one special character.'
    })
});

export { bodyCreateUser };
