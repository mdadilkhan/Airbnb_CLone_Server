import express from 'express'
import { fetchUser, github, google,login,logoutUser,register } from '../controller/auth.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router=express.Router();


router.post('/register',register)
router.post('/googleSignin',google)
router.post('/githubSignin',github)
router.post('/login',login)
router.post('/logout',verifyToken,logoutUser)
router.get('/getUserDetials',verifyToken,fetchUser);


export default router;



