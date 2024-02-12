import {bodyLogin} from '../joi-schemas/schema-login.js'


async function validateBodyLogin (req, res, next){
    try {
        
        await bodyLogin.validateAsync(req.body)

        next()


    } catch (error) {

        return res.status(400).json({message: error.message})
        
    }
}


export {validateBodyLogin}