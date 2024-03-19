import { poolRequest, closePool, sql } from '../utils/dbConnect.js';
import logger from "../utils/logger.js";

export const addMenuService = async (restaurant) => {
    try {
        const result = await poolRequest()
            .input('RestaurantId', sql.VarChar, restaurant.RestaurantId)
            .input('MenuUrl', sql.VarChar, restaurant.MenuUrl)
            .query("INSERT INTO Restaurant(RestaurantId, MenuUrl) VALUES (@RestaurantId, @MenuUrl)");
        return result;
    } catch (error) {
        return error;
    }
};

export const addOfferService = async (restaurant) => {
    try {
        const result = await poolRequest()
            .input('RestaurantId', sql.VarChar, restaurant.RestaurantId)
            .input('OfferUrl', sql.VarChar, restaurant.OfferUrl)
            .query("INSERT INTO Restaurant(RestaurantId, OfferUrl) VALUES (@RestaurantId, @OfferUrl)");
        return result;
    } catch (error) {
        return error;
    }
};

export const getOfferByUrlService = async (offerUrl) => {
    try {
      const getOfferByUrl = await poolRequest()
        .input("offerUrl", sql.VarChar, offerUrl)
        .query("SELECT * FROM Restaurant WHERE offerUrl=@offerUrl");
      console.log("single offer", getOfferByUrl.recordset);
      if (getOfferByUrl.rowsAffected[0] >= 0) {
        return getOfferByUrl.rowsAffected[0];
      }
    } catch (error) {
      return error
    }
};

export const updateMenuService = async (updateMenu) => {
    console.log("update menu",updateMenu);
    try {
      const updatedMenu=await poolRequest()
      .input('RestaurantId', sql.VarChar,updatedMenu.RestaurantId)
      .input('MenuUrl', sql.VarChar,updatedMenu.MenuUrl)
    .query(`UPDATE Restaurant SET MenuUrl = @MenuUrl WHERE RestaurantId = @RestaurantId`)
  console.log("updated",updatedMenu);
    return updatedMenu
    
    } catch (error) {
      return error
    }
};

export const updateOfferService = async (updateOffer) => {
    console.log("update offer",updateOffer);
    try {
      const updatedOffer=await poolRequest()
      .input('RestaurantId', sql.VarChar,updatedOffer.RestaurantId)
      .input('OfferUrl', sql.VarChar,updatedOffer.OfferUrl)
    .query(`UPDATE Restaurant SET OfferUrl = @OfferUrl WHERE RestaurantId = @RestaurantId`)
  console.log("updated",updatedOffer);
    return updatedOffer
    
    } catch (error) {
      return error
    }
};

export const deleteMenuService=async(RestaurantId)=>{
    const deletedMenu= await poolRequest()
    .input('RestaurantId', sql.VarChar,RestaurantId)
    .query('DELETE FROM Restaurant WHERE RestaurantId = @RestaurantId')
    console.log(' yeah',deletedMenu.recordset);
    return deletedMenu.recordset;
}

export const deleteUserServices=async(UserId)=>{
    const deletedUser= await poolRequest()
    .input('UserId', sql.VarChar,UserId)
    .query('DELETE FROM Users WHERE UserId = @UserId')
    console.log(' yeah',deletedUser.recordset);
    return deletedUser.recordset;
}
