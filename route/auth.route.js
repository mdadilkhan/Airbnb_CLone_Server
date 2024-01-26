import express from 'express'
import { checkCookie, google,login,register } from '../controller/auth.controller.js';


const router=express.Router();


router.post('/register',register)
router.post('/googleSignin',google)
router.post('/login',login)
router.post('/check',checkCookie);


export default router;



