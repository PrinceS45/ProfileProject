import express from "express" ;
import dotenv from "dotenv" ;
import cors from "cors" ;
import connectDB from "./lib/db.js" ; 
import cookieParser from "cookie-parser";
import authRoute from "./routes/authRoute.js" ; 
import profileRoute from "./routes/profileRoute.js" ; 

dotenv.config() ;


const app = express() ; 


// handle cors here
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true, 
              
})); 
// allow json req
app.use(express.json()) ; 
// use cookieparser to parse cookies from req 
app.use(cookieParser())  ; 


const PORT = process.env.PORT || 5001; 

// routes 

// for server wakeup 
app.get("/health" , (req , res) => {
     res.status(200).json({
      message : "Server is healty and ok " , 
     })
}) ;

app.use("/api/auth" , authRoute) ; 

app.use("/api/userProfile" , profileRoute ) ; 




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB() ; 
});