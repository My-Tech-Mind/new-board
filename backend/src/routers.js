import express from 'express';

export const router = express.Router(); 

router.get('/', async (req, res)=>{
	return res.status(200).json({status: "Ok"});
});