import joi from 'joi';

const loginSchema = joi.object({
    email: joi.string().email().required().messages({
        'any.required': 'The email field is required.',
        'string.empty': 'The email field cannot be empty.',
        'string.email': 'The email field must be a valid email address.'
    }),
    password: joi.string().min(8).max(20).required().messages({
        'any.required': 'The password field is required.',
        'string.empty': 'The password field cannot be empty.',
        'string.min': 'The password field must be at least {#limit} characters long.',
        'string.max': 'The password field must be at most {#limit} characters long.'
    })
});

export { loginSchema };
