import { Router } from 'express';
import { createUser, deleteUserController, getSingleUserController, getUsers, loginUserController, updateUserControllers, updateUserPasswordControllers } from '../controllers/userController.js';

const userRouter = Router();


userRouter.get('/users', getUsers);
userRouter.post('/users', createUser);
userRouter.post('/users/login' , loginUserController)
userRouter.get('/users/single/:UserId' , getSingleUserController)
userRouter.put('/users/update/:UserId' , updateUserControllers)
userRouter.patch('/users/patch/:UserId', updateUserPasswordControllers)
userRouter.delete('/users/delete/:UserId', deleteUserController)





export default userRouter;