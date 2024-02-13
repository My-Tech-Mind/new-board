import joi from 'joi'


const bodyCreateBoard = joi.object({
    title: joi.string().required().messages({
        'any.required': 'The title field is required.',
        'string.empty': 'The title field cannot be empty.'
    })

});


export {bodyCreateBoard}