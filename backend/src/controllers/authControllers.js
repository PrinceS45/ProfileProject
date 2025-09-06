import User from "../models/user.js" ; 
import bcrypt from 'bcryptjs'
import { genrateToken } from "../lib/utils.js" ; 

// SignUp controller
const signup = async (req, res) => {
 
    const { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(404).json({
                message: "All field are required",
            })
        }
        // check password lenght 
        if (password.length < 6) {
            return res.status(404).json({
                message: "Password must contain atleast 6 character",
            });
        }


        // check email is exit or not 
        const isUserExit = await User.findOne({ email });
        if (isUserExit) return res.status(404).json({ message: "Email already exit" });

        // next step hash the password for saftey 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create new user and store in db
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        if (newUser) {
            // genrate  jwt token and this also save token in cookie
            genrateToken(newUser._id, res);
            // save newUser databse
            await newUser.save();

            return res.status(201).json({
                _id: newUser._id,
                email: newUser.email,
                fullName: newUser.fullName,
            });

        }

        else {
            return res.status(400).json({
                message: "Invalid Admin data",
            })
        }

    }

    catch(error) {
        console.log(`Error in signup controller` , error) ; 
        return res.status(500).json({
            message : "Internal Server Error" , 
        })
    }
}



// login controller 

const login = async (req , res) => {
    const{email , password} = req.body ; 
       console.log("req aaa hue")
    try {
        const user = await User.findOne({email}) ; 
        if(!user) return res.status(404).json({
            message : "Invalid Credientials"
        })

        // check for password 
        const isPasswordCorrect = await bcrypt.compare(password , user.password ) ; 

        if(!isPasswordCorrect) return res.status(400).json({
            message : "Invalid Credientials" ,
        }) 
        
          genrateToken(user._id , res ); 

        return res.status(200).json({
            _id : user._id , 
            fullName : user.fullName ,
            email : user.email ,
        })
    }
    catch(error) {
        console.log(`Eroor in login controller` , error) ; 
        return res.status(500).json({
            message : "Internal Server Error" , 
        })
    }
}


// logout controller 

const logout = async (req , res) => {
        try{
            res.cookie("jwt" , "" , {maxAge : '0'}) ;
            return res.status(200).json({
                message : "Logout Successfully" ,
            })
        }
        catch {
            console.log("Error in logout controller") ; 
            return res.status(500).json({
                message : "Internal Server Error" , 
            })
        }
}  ; 

// authCheck

const checkAuth = (req , res) => {
    try {
        res.status(200).json({user : req.user}) ; 
    } catch (error) {
        console.log("Error in checkAuth controller" , error.message) ; 

        res.status(500).json({message : "Internal Server error"}) ; 
    }
}



export{signup , login , logout ,checkAuth} ;