import express from 'express'
import { fetchUser, google,login,register } from '../controller/auth.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router=express.Router();


router.post('/register',register)
router.post('/googleSignin',google)
router.post('/login',login)
router.get('/getUserDetials',verifyToken,fetchUser);


export default router;



