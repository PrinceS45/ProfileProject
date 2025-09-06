import jwt from  'jsonwebtoken'
import User from "../models/user.js" ; 

const protectRoute = async (req , res , next) => {
    try {
        const token = req.cookies.jwt; 
        if(!token) return res.status(404).json({
            message : "Unathorized -No token provided"  , 
        })
            // jwt funtion return admin._id if token is valid
        const decode = jwt.verify(token , process.env.JWT_SECRET) ; 

        if(!decode) return res.status(404).json({
            message : "Unauthorized : Invalid token" ,
        })

        // find user 
        const user = await User.findOne({_id : decode.userId} , {password : 0}) ; 

        if(!user) return res.status(404).json({
            message : "Unauthorized : No User found" ,
        })

        req.user = user ; 
         next() ; 
    }
      
     catch(error) {
       console.log("Error in protectRoute middleware" , error ) ; 
       return res.status(500).json({
        message : "Internal Server Errror "
       })
   }
}

export default protectRoute  ; 
  