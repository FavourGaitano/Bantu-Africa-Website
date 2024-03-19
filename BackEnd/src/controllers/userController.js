import { sendNotFound, sendServerError, sendCreated, paginate, orderData } from '../helper/helperFunctions.js';
import { addUserService, 
        getUsersService, 
        getUserByEmailService,
        authenticateloginUserService,
        updateUserService,
        updatePasswordService,
        getSingleUserServices,
        deleteUserServices} from '../services/usersService.js';
import { userValidator,
         userLoginValidation,
         updateUserPasswordValidator, 
         updateUserValidator
         } from '../validators/userValidator.js';
import {v4} from 'uuid';
import bcrypt from 'bcrypt'


export const getUsers = async (req, res) => {    
    try {
        const users = await getUsersService();
        if (users.length === 0) {
            sendNotFound(res, 'No users found');
        } else {
            return res.status(200).json({users:users})
        }
    } catch (error) {
        sendServerError(res, error);
    }
}


export const createUser = async (req, res) => {
    const { FirstName,LastName,Email,Password } = req.body;
    console.log("req.body", req.body);

    const existingUser = await getUserByEmailService(Email);
    console.log("existing user",existingUser);

    if (existingUser) {
    
        return res.status(400).send({message:"User with the provided email or username already exists"});
      }else{
     


        const { error } = userValidator(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        } else {
            try {
                const UserId = v4();
                const hashedPassword = await bcrypt.hash(Password, 8);  
                

                const newUser = {
                    UserId,
                    FirstName,
                    LastName,
                    Email,
                    Password: hashedPassword,
                }
                console.log("user", newUser);
                let response = await addUserService(newUser);
                if (response.message) {
                    sendServerError(res, response.message);
                } else {
                    sendCreated(res, 'User created successfully');
                }
            } catch (error) {
                sendServerError(res, error.message);
            }
        }
    }
}

export const loginUserController=async(req,res)=>{
    try {
      const { Email, Password } = req.body;
        const { error } = userLoginValidation({ Email, Password });
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const user = await authenticateloginUserService({ Email, Password });
  
      if (user.error) {
        console.log("This is an error",user.error);
        return notAuthorized(res, user.error);
      }
  
      // Successful login
      res.status(200).json({ user,message:"Logged In successfully!" });
    } catch (error) {
      return sendServerError(res, "Internal server error");
    }
}

export const updateUserControllers = async (req, res) => {
  try {
    const { FirstName, LastName, Email} = req.body;

    const { UserId } = req.params;
    console.log("user id",UserId);
    const existingUser = await getSingleUserServices(UserId);

    if (existingUser.rowsAffected[0] === 0) {
      return res.status(400).json({ message: "User not found" });
    }else{

    const { error } = updateUserValidator({ FirstName, LastName, Email});
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const updatedUser = await updateUserService({ FirstName, LastName, Email,UserId});
    console.log('Updated one', updatedUser);

    if (updatedUser.error || updatedUser.rowsAffected<1) {
      return sendServerError(res, updatedUser.error);
    }
    return sendCreated(res, 'User updated successfully');
  }
  } catch (error) {
    return sendServerError(res, 'Internal server error');
  }
};

  
export const updateUserPasswordControllers = async (req, res) => {
  try {
    const { Password } = req.body;
    const { UserId } = req.params;

    const { error } = updateUserPasswordValidator({ Password});
    const updatedhashedPassword=bcrypt.hash(Password,8)
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const updatedPass = await updatePasswordService({ updatedhashedPassword, UserId });
    console.log('Updated one',updatedPass);

    if (updatedPass.error) {
      return sendServerError(res, updatedPass.error);
    }

    return sendCreated(res, 'User updated successfully');
  } catch (error) {
    return sendServerError(res, 'Internal server error');
  }
};

export const getSingleUserController=async(req,res)=>{
  try {
    const {UserId}=req.params
    const singleUser=await getSingleUserServices(UserId)
    if(singleUser.rowsAffected==0){
      res.status(400).json({message:"user Not found"})
  }else{
    const {Password,...result}=singleUser.recordset[0]
    return res.status(200).json({ user: result });
  } 
    
  } catch (error) {
    return error
  }
}



export const deleteUserController=async(req,res)=>{
  try {
    const {UserId}=req.params
    const existingUser=await getSingleUserServices(UserId)
    if(existingUser.rowsAffected>0){
      const deletedUser=await deleteUserServices(UserId)
      console.log("deleted user",deletedUser);
      sendDeleteSuccess(res,"Deleted successfully")
  }else{
    res.status(400).json({message:"user Not found"})
  } 
    
  } catch (error) {
    return error
  }
}






