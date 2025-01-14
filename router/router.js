import express from 'express'
import { login, signUp } from '../controllers/userController.js'
import  {deleteTodo, todoItem, updateTodo}  from '../controllers/todoController.js'
import { deleteTodoData, todoData, todos, updateTodoData } from '../controllers/todoListController.js'
import checkAuth from '../middleware/checkauth.js'
// import checkAuth from '../middleware/checkauth.js'


const router = express.Router()


router.post('/register',signUp)
router.post('/login',login)
router.get('/getTodos',checkAuth,todos)
router.post('/todo',checkAuth,todoData)  
router.put('/update/:userId/:id',updateTodo)
router.put('/update/:id',checkAuth,updateTodoData)
router.delete('/delete/:userId/:id',deleteTodo)
router.delete('/delete/:id',checkAuth,deleteTodoData)

export default router