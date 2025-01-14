import mongoose from "mongoose";


const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        trim:true,
        required:true,
        
    },
    description:{
        type:String,
        required:true,
    }
})

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        trim:true,
        required:true,
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        length:8,
        trim:true,
        required:true,
        number:true,
        Symbol:true,
        excludeSimilarCharacters:true,
        strict:true,
    },
    todo:{
        type:[todoSchema],
    }
    
})
const User = mongoose.model('user',userSchema)
export {User} 