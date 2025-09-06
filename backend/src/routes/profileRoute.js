import express from "express"  ; 
import protectRoute from "../middlewares/auth.middleware.js" ; 
import {getProfileById , getMyProfile, getAllProfile , getProfileBySkills ,  createProfile , updateProfile , deleteProfile } from "../controllers/profileController.js";

const router = express.Router() ; 

router.get("/profile/:id" , getProfileById) ; 
router.get("/profiles" , getAllProfile) ; 
router.get("/profile/skills" , getProfileBySkills) ; 
router.get("/me" , protectRoute , getMyProfile) ; 

router.post("/createProfile"  , protectRoute , createProfile) ; 

router.patch("/updateProfile/:id" , protectRoute , updateProfile) ; 

router.delete("/deleteProfile/:id" , protectRoute , deleteProfile)  ; 


export default router ; 