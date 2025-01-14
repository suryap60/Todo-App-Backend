import { User } from "../models/userSchema.js";

const todos = async(req,res)=>{
    try{
        const user = req.user
        const existingUser = await User.findById(user._id)

        if(!existingUser){
            return res.status(401).json({error:"User Not Authenticated"})
        }

        // Ensure the 'todo' field exists and is an array
        if (!Array.isArray(existingUser.todo)) {
             return res.status(400).json({ error: 'User has no valid todo list' });
        }

        const todos = existingUser.todo

        if(todos.length === 0){
            console.log("Todos Not Found")
        }
        return res.status(200).json({message:"Successfully Get All todos",todos})
    }
    catch(error){
        return res
        .status(500)
        .json({
            error:error.message
        })
    }
}

const todoData = async(req,res)=>{

    try{
        const { title , description } = req.body

        if(!title){
            return res
            .status(400)
            .json({
                message:"Please Enter title"
            })
        }

        if(!description){
            return res
            .status(400)
            .json({
                message:"Please Enter description"
            })
        }
        const user = req.user
        const existingUser = await User.findById(user._id)
        existingUser.todo.push({ title ,description });
        await existingUser.save()

        return res
        .status(201)
        .json({
            message:"New Todo Created Successfully",todo:existingUser
        })
        
    }
    catch(error){
        return res
        .status(500)
        .json({
            error:error.message
        })
    }
}

const updateTodoData = async(req,res)=>{

   try{
    const user = req.user  
    const todoId = req.params.id
    const updateData = req.body

    const existingUser = await User.findById(user._id)

    if(!existingUser){
        return res.status(404).json({message:"User Not Found"})
    }

    // Find the specific todo item in the user's todo array and update it
    const todoIndex = existingUser.todo.findIndex(todo => todo._id.toString() === todoId) 

    if (!todoIndex) {
        return res.status(404).json({ message: "Todo not Found" });
    }

    // Update the todo
    existingUser.todo[todoIndex] = { ...existingUser.todo[todoIndex]._doc, ...updateData }; // Merge new data with existing todo
    await existingUser.save(); //Save the user document with the updated todo array

    


    return res
    .status(200)
    .json({
        message:"todo Updated Successfully",  todo: existingUser.todo[todoIndex]
    })
   

   }catch(error){
    return res
    .status(500)
    .json({
        error:error.message
    })
   }
}

const deleteTodoData = async (req,res)=>{

    try{
        const user = req.user
        const todoId = req.params.id
        const existingUser = await User.findById(user._id)

    if(!existingUser){
        return res.status(404).json({message:"User Not Found"})
    }

    const todoIndex = existingUser.todo.findIndex(todo => todo._id.toString() === todoId);
    if(todoIndex === -1){
        return res.status(404).json({
            message:'Todo Not Found'
        })
    }

    // Remove the todo from the array
    existingUser.todo.splice(todoIndex,1)

    await existingUser.save();
    return res.status(200).json({ message: "Todo deleted successfully",existingUser });
    }
    catch(error){

        return res
        .status(500)
        .json({
            error:error.message
        })
       }
}

export { todos , todoData , updateTodoData , deleteTodoData}