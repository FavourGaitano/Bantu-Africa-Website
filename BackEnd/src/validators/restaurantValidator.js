import joi from 'joi';

export const menuValidator = (restaurant) => {
    const menuValidatorSchema = joi.object({
        MenuUrl: joi.string().required()
        
        
    });
    return menuValidatorSchema.validate(restaurant);
}

export const offerValidator = (restaurant) => {
    const offerValidatorSchema = joi.object({
        OfferUrl: joi.string().required()
        
        
    });
    return offerValidatorSchema.validate(restaurant);
}

export  const updateMenuValidator=(updateMenu)=>{
    const updateMenuValidatorSchema=joi.object({
        MenuUrl: joi.string().required()
    })
     
  
    return updateMenuValidatorSchema.validate(updateMenu);
}

export  const updateOfferValidator=(updateOffer)=>{
    const updateOfferValidatorSchema=joi.object({
        OfferUrl: joi.string().required()
    })
     
  
    return updateOfferValidatorSchema.validate(updateOffer);
}
  
  
  
 