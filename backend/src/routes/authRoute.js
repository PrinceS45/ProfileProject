import express from 'express'
import {signup , login , logout , checkAuth} from "../controllers/authControllers.js" ; 
import protectRoute from "../middlewares/auth.middleware.js" ; 

const router = express.Router() ; 

router.post('/signup' , signup) ; 

router.post("/login" , login); 

router.get("/logout" , logout) ; 

router.get("/checkAuth" ,protectRoute ,  checkAuth) ; 

export default router; 




