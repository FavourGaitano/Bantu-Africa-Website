import joi from 'joi';

export const userValidator = (user) => {
    const userValidatorSchema = joi.object({
        FirstName: joi.string().required(),
        LastName: joi.string().required(),
        Email: joi.string().required(),
        Password: joi.string().required()
        
    });
    return userValidatorSchema.validate(user);
}

export const userLoginValidation = (user) => {
    const userLoginSchema = joi.object({
      Email: joi.string().email().required(),
      Password: joi.string().required(),
      
    });
  
    return userLoginSchema.validate(user);
};

export  const updateUserValidator=(updateduser)=>{
    const updateUserValidatorSchema=joi.object({
        FirstName: joi.string().required(),
        LastName: joi.string().required(),
        Email: joi.string().required()
    })
     
  
    return updateUserValidatorSchema.validate(updateduser);
  }
  
  
  
  export  const updateUserPasswordValidator=(updateduser)=>{
    const updateUserPassValidatorSchema=joi.object({
        Password: joi.string().min(4).required(),
    })
  
    return updateUserPassValidatorSchema.validate(updateduser);
}