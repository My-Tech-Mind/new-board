import joi from 'joi';

const userSchema = joi.object({
    name: joi.string().max(40).required().messages({
        'any.required': 'The name field is required.',
        'string.empty': 'The name field cannot be empty.',
        'string.max': 'The name field must be at most {#limit} characters long.'
    }),
    email: joi.string().email().max(256).required().messages({
        'any.required': 'The email field is required.',
        'string.empty': 'The email field cannot be empty.',
        'string.email': 'The email field must be a valid email address.',
        'string.max': 'The email field must be at most {#limit} characters long.'
    }),
    password: joi.string().min(8).max(20).required().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-])[A-Za-z\d!@#$%^&*()_+\-]+$/).messages({
        'any.required': 'The password field is required.',
        'string.empty': 'The password field cannot be empty.',
        'string.min': 'The password field must be at least {#limit} characters long.',
        'string.max': 'The password field must be at most {#limit} characters long.',
        'string.pattern.base': 'The password must have at least 8 characters, one uppercase letter, one digit, and one special character.'
    })
});

export { userSchema };
