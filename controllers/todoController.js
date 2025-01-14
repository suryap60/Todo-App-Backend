import { User } from "../models/userSchema.js";

const todoItem = async(req,res)=>{

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
        const userId = req.params.id
        const user = await User.findById({_id:userId})
        user.todo.push({ title ,description });
        await user.save()

        return res
        .status(201)
        .json({
            message:"New Todo Created Successfully",todo:user
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

const updateTodo = async(req,res)=>{

   try{
    const userId = req.params.userId  // Get the user information directly from the decoded token
    const todoId = req.params.id
    const updateData = req.body

    const user = await User.findById({_id:userId})

    if(!user){
        return res.status(404).json({message:"User Not Found"})
    }

    // Find the specific todo item in the user's todo array and update it
    const todoIndex = user.todo.findIndex(todo => todo._id.toString() === todoId);

    if (todoIndex === -1) {
        return res.status(404).json({ message: "Todo not Found" });
    }

    // Update the todo
    user.todo[todoIndex] = { ...user.todo[todoIndex]._doc, ...updateData }; // Merge new data with existing todo
    await user.save(); //Save the user document with the updated todo array

    


    return res
    .status(200)
    .json({
        message:"todo Updated Successfully",  todo: user.todo[todoIndex]
    })
   

   }catch(error){
    return res
    .status(500)
    .json({
        error:error.message
    })
   }
}

const deleteTodo = async (req,res)=>{

    try{
        const userId = req.params.userId 
        const todoId = req.params.id
        const user = await User.findById({_id:userId})

    if(!user){
        return res.status(404).json({message:"User Not Found"})
    }

    const todoIndex = user.todo.findIndex(todo => todo._id.toString() === todoId);
    if(todoIndex === -1){
        return res.status(404).json({
            message:'Todo Not Found'
        })
    }

    // Remove the todo from the array
    user.todo.splice(todoIndex,1)

    await user.save();
    return res.status(200).json({ message: "Todo deleted successfully",user });
    }
    catch(error){

        return res
        .status(500)
        .json({
            error:error.message
        })
       }
}

export { todoItem , updateTodo , deleteTodo}