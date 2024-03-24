import { sendNotFound, sendServerError, sendCreated, paginate, orderData } from '../helper/helperFunctions.js';
import { addMenuService, 
        addOfferService, 
        getOfferByUrlService,
        updateMenuService,
        updateOfferService,
        deleteMenuService,
        getSingleMenuService,
        getSingleOfferService,
        getRestaurantServiceMenu,
        getRestaurantServiceOffer
        } from '../services/restaurantService.js';
import { menuValidator,
        offerValidator,
        updateMenuValidator,
        updateOfferValidator
         } from '../validators/restaurantValidator.js';
import {v4} from 'uuid';

export const getRestaurantMenu = async (req, res) => {    
  try {
      const restaurant = await getRestaurantServiceMenu();
      if (restaurant.length === 0) {
          sendNotFound(res, 'No details found');
      } else {
          return res.status(200).json({restaurant:restaurant})
      }
  } catch (error) {
      sendServerError(res, error);
  }
}

export const getRestaurantOffer = async (req, res) => {    
  try {
      const restaurant = await getRestaurantServiceOffer();
      if (restaurant.length === 0) {
          sendNotFound(res, 'No details found');
      } else {
          return res.status(200).json({restaurant:restaurant})
      }
  } catch (error) {
      sendServerError(res, error);
  }
}


export const createMenu = async (req, res) => {
    const { MenuUrl } = req.body;
    const { error } = menuValidator(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    } else {
        try {
            const RestaurantId = v4();
            

            const newMenu = {
                RestaurantId,
                MenuUrl
            }
            let response = await addMenuService(newMenu);
            if (response.message) {
                sendServerError(res, response.message);
            } else {
                sendCreated(res, 'Menu created successfully');
            }
        } catch (error) {
            sendServerError(res, error.message);
        }
    }
}

export const createOffer = async (req, res) => {
    const { OfferUrl } = req.body;
    console.log("req.body", req.body);

    const existingOffer = await getOfferByUrlService(OfferUrl);
    console.log("existing offer",existingOffer);

    if (existingOffer) {
    
        return res.status(400).send({message:"Offer with the provided Url already exists"});
      }else{
     


        const { error } = offerValidator(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        } else {
            try {
                const RestaurantId = v4();
                 
                

                const newOffer = {
                    RestaurantId,
                    OfferUrl
                }
                console.log("offer", newOffer);
                let response = await addOfferService(newOffer);
                if (response.message) {
                    sendServerError(res, response.message);
                } else {
                    sendCreated(res, 'Offer created successfully');
                }
            } catch (error) {
                sendServerError(res, error.message);
            }
        }
    }
}


export const updateMenuControllers = async (req, res) => {
  try {
    const { MenuUrl} = req.body;

    const { RestaurantId } = req.params;
    console.log(" restaurant id",RestaurantId);
    const existingMenu = await getSingleMenuService(RestaurantId);

    if (existingMenu.rowsAffected[0] === 0) {
      return res.status(400).json({ message: "Menu not found" });
    }else{

    const { error } = updateMenuValidator({ MenuUrl});
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const updatedMenu = await updateMenuService({MenuUrl, RestaurantId});
   

    if (updatedMenu.error ||updatedMenu.rowsAffected<1) {
      return sendServerError(res, updatedMenu.error);
    }
    return sendCreated(res, 'Menu updated successfully');
  }
  } catch (error) {
    return sendServerError(res, 'Internal server error');
  }
};

export const updateOfferControllers = async (req, res) => {
    try {
      const { OfferUrl} = req.body;
  
      const { RestaurantId } = req.params;
      console.log(" restaurant id",RestaurantId);
      const existingOffer = await getSingleOfferService(RestaurantId);
  
      if (existingOffer.rowsAffected[0] === 0) {
        return res.status(400).json({ message: "Offer not found" });
      }else{
  
      const { error } = updateOfferValidator({ OfferUrl});
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      const updatedOffer = await updateOfferService({OfferUrl, RestaurantId});
     console.log("updated offer",updatedOffer);
  
      if (updatedOffer.error ||updatedOffer.rowsAffected<1) {
        return sendServerError(res, updatedOffer.error);
      }
      return sendCreated(res, 'Offer updated successfully');
    }
    } catch (error) {
      return sendServerError(res, 'Internal server error');
    }
};

export const getSingleOfferController=async(req,res)=>{
    try {
      const {OfferId}=req.params
      const singleOffer=await getSingleOfferService(OfferId)
      if(singleOffer.rowsAffected==0){
        res.status(400).json({message:"Offer Not found"})
    }else{
      const {result}=singleOffer.recordset[0]
      return res.status(200).json({ offer: result });
    } 
      
    } catch (error) {
      return error
    }
}
  

export const getSingleMenuController=async(req,res)=>{
  try {
    const {RestaurantId}=req.params
    const singleMenu=await getSingleMenuService(RestaurantId)
    if(singleMenu.rowsAffected==0){
      res.status(400).json({message:"Menu Not found"})
  }else{
    const {result}=singleMenu.recordset[0]
    return res.status(200).json({ menu: result });
  } 
    
  } catch (error) {
    return error
  }
}



export const deleteMenuController=async(req,res)=>{
  try {
    const {RestaurantId}=req.params
    const existingMenu=await getSingleMenuService(RestaurantId)
    if(existingMenu.rowsAffected>0){
      const deletedMenu=await deleteMenuService(RestaurantId)
      console.log("deleted menu",deletedMenu);
      sendDeleteSuccess(res,"Deleted successfully")
  }else{
    res.status(400).json({message:"Menu Not found"})
  } 
    
  } catch (error) {
    return error
  }
}






