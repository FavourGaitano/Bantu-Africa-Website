import { poolRequest, closePool, sql } from '../utils/dbConnect.js';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import logger from "../utils/logger.js";

export const getUsersService = async () => {
    try {
        const result = await poolRequest().query("SELECT * FROM Users");
        return result.recordset;
    } catch (error) {
        return error.message;
    }
};

export const addUserService = async (user) => {
    try {
        const result = await poolRequest()
            .input('UserId', sql.VarChar, user.UserId)
            .input('FirstName', sql.VarChar, user.FirstName)
            .input('LastName', sql.VarChar, user.LastName)
            .input('Email', sql.VarChar, user.Email)
            .input('Password', sql.VarChar, user.Password)
            .query("INSERT INTO Users(UserId, FirstName, LastName, Email, Password) VALUES (@UserId, @FirstName, @LastName, @Email, @Password)");
        return result;
    } catch (error) {
        return error;
    }
};

export const getUserByEmailService = async (Email) => {
    try {
      const getUserByEmail = await poolRequest()
        .input("Email", sql.VarChar, Email)
        .query("SELECT * FROM Users WHERE Email=@Email");
      console.log("single user", getUserByEmail.recordset);
      if (getUserByEmail.rowsAffected[0] >= 0) {
        return getUserByEmail.rowsAffected[0];
      }
    } catch (error) {
      return error
    }
};

export const authenticateloginUserService = async (user) => {
  try {
    const userFoundResponse = await poolRequest()
      .input("Email", sql.VarChar, user.Email)
      .query("SELECT * FROM Users WHERE Email=@Email");
    if (userFoundResponse.recordset[0]) {
    
      if(await bcrypt.compare(user.Password,userFoundResponse.recordset[0].Password)){
        console.log("Generating token");

        let token=jwt.sign({
          UserId:userFoundResponse.recordset[0].UserId,
          Password:userFoundResponse.recordset[0].Password,
          Email:userFoundResponse.recordset[0].Email
        },process.env.SECRET_KEY,{ expiresIn: "24h" })
        console.log("Token is",token);

        console.error("Error generating token:", error);
        const {Password,...user}=userFoundResponse.recordset[0]
        return {user,token:`JWT ${token}`}
  
      }else{
        return { error: 'Invalid Credentials' };
      }
    } else {
      return { error: "Invalid Credentials" };
    }
  } catch (error) {
    logger.error("Login Error", error);
    return { error: "Invalid Credentials" };
  }
};

export const updateUserService = async (updateUser) => {
  console.log("update user",updateUser);
  try {
    const updatedUser=await poolRequest()
    .input('UserId', sql.VarChar,updateUser.UserId)
    .input('FirstName', sql.VarChar,updateUser.FirstName)
    .input('LastName', sql.VarChar,updateUser.LastName)
    .input('Email', sql.VarChar,updateUser.Email)
  .query(`UPDATE Users SET FirstName = @FirstName, LastName = @LastName, Email = @Email WHERE UserId = @UserId`)
console.log("updated",updateUser);
  return updatedUser
  
  } catch (error) {
    return error
  }
};

export const updatePasswordService = async (updatePassword) => {
  try {
    const updatedPassword = await poolRequest()
      .input("UserId", sql.VarChar, updatePassword.UserId)
      .input("Password", sql.VarChar, updatePassword.Password)
      .query("UPDATE Users SET Password=@Password WHERE UserId=@UserId");
    logger.info("updated password", updatedPassword);
    return updatedPassword;
  } catch (error) {
    return { error: "Invalid Credentials" };
  }
};

export const getSingleUserServices=async(UserId)=>{
  const singleUser= await poolRequest()
  .input('UserId', sql.VarChar,UserId)
  .query('SELECT * FROM Users WHERE UserId = @UserId')
  console.log('single user',singleUser);
  return singleUser
}


export const deleteUserServices=async(UserId)=>{
  const deletedUser= await poolRequest()
  .input('UserId', sql.VarChar,UserId)
  .query('DELETE FROM Users WHERE UserId = @UserId')
  console.log(' yeah',deletedUser.recordset);
  return deletedUser.recordset;
}


