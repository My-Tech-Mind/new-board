import {bodyCreateBoard} from '../joi-schemas/schema-boards.js'

async function validateBodyCreateBoard(req, res, next){
    try {
        
        await bodyCreateBoard.validateAsync(req.body)

        next()


    } catch (error) {

        return res.status(400).json({message: error.message})
        
    }
}

export {validateBodyCreateBoard}