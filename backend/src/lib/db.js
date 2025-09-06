import mongoose from 'mongoose' ; 
import dotenv from 'dotenv' ;

const connectDB = async ()=> {
    try{
        await mongoose.connect(process.env.MONGODB_URL).then(()=> {
             console.log(`MongoDB Database connected`) ; 
        })


       
    }
    catch (error) {
         console.log(`Error in connecting Database ` , error) ; 
    }
}

export default connectDB ; 