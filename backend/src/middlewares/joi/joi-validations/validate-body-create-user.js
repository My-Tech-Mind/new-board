import {bodyCreateUser} from'../joi-schemas/schema-users.js'


async function validateBodyCreateUser (req, res, next){
    try {
        
        await bodyCreateUser.validateAsync(req.body)

        next()


    } catch (error) {

        return res.status(400).json({message: error.message})
        
    }
}

export {validateBodyCreateUser}

