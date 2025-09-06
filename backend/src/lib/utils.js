import jwt from 'jsonwebtoken';
import express from "express" ;

const genrateToken = (userId , res) => {
    // token willl expire in seven days 
    const token = jwt.sign({userId} , process.env.JWT_SECRET , {
        expiresIn :"7d" , 
    }) ; 

    // save in cookie take care of cross site 
    res.cookie("jwt" , token , {
        maxAge : 7 * 24 * 60 * 60 * 1000 , 
        httpOnly : true , 
        sameSite : process.env.NODE_ENV != "development" ? "none" : "strict" , 
        secure : process.env.NODE_ENV != "development" ,
    })

    return token ; 
    
}

export {genrateToken} ;

