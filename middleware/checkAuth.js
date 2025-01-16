import { User } from "../models/userSchema.js";
import { verifyToken } from "../utils/jwt.js";

const checkAuth =async(req,res,next)=>{
    try{
        const token = req.headers.authorization?.split(" ")[1];
        //?.split(" ")[1]; // Extract the token after 'Bearer'
    // console.log(token)

    if(!token){
        return res
        .status(401)
        .json({
            message:"Access Denied"
        })
    }

    const tokenValid = verifyToken(token)

    if(!tokenValid){
        return res
        .status(403)
        .json({
            message
        })
    }
  
    // Attach the decoded user information (userId) to the request object
    req.user = tokenValid;  // This could contain all user info from the token

    next()


    }
    catch(error){
        return res
        .status(500)
        .json({
            error:error.message
        })
    }
}

export default checkAuth