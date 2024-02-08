import express from 'express';
import { conn } from './database/connection.js';

export const router = express.Router(); 

router.get('/', async (req, res)=>{
	return res.status(200).json({status: "Ok"});
});