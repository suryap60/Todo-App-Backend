import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        const { connection } = await mongoose.connect(process.env.MONGO_URI)
        console.log(`DB running on ${connection.host}`)
    }
    catch(error){
        console.log(error.message)
    }
}

export default connectDB