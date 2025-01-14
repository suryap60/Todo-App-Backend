import {User} from "../models/userSchema.js";
import { comparedPassword, generateHashedPassword } from "../utils/bcrypt.js";
import { generateAccessToken } from "../utils/jwt.js";
import { validateEmail, ValidatePassword } from "../validation/validation.js";

const signUp = async (req,res)=>{

    try{
        const { userName, email, password } = req.body;

    if(!validateEmail(email)){
        return res
        .status(400)
        .json({
            message:"Enter a validate email"
        })
    }

    if(!ValidatePassword(password)){
        return res
        .status(400)
        .json({
            message:"Password must be between 8 and 20 characters long, contain at least one letter, one number, and one special character."
        })
    }

    const existingUser = await User.findOne({email});

    if(existingUser){
        return res
        .status(409)
        .json({
            message:"email is already existing"
        })
    }

    const hashedPassword = await generateHashedPassword(password)

    const newUser = new User({ userName , email , password:hashedPassword});
    await newUser.save()

    return res.status(201).json({message:"User SignUp Successfully",user:newUser})
    }
    catch(error){
        return res.status(500).json({error:error.message})
    }


}

const login = async(req,res)=>{
    try{
        const { email , password } = req.body;

        const existingUser = await User.findOne({email})


        if(!existingUser){
            return res
            .status(401)
            .json({message:"Invalid EmailId"})
        }

        const validPassword =await comparedPassword(
            password,
            existingUser.password)

        if(!validPassword){
            return res
            .status(401)
            .json({message:"Invalid Password"})
        }

        const accessToken = generateAccessToken(existingUser._id)

        return res
        .status(200)
        .json({message:"User Login Successfully",user:existingUser,accessToken})

    }
    catch(error){
        return res 
        .status(500)
        .json({
            error:error.message
        })
    }

}

export { signUp , login}