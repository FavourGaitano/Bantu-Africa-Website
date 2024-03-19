import { Router } from 'express';
import { createMenu, createOffer, deleteMenuController, getRestaurant, getSingleMenuController, getSingleOfferController, updateMenuControllers, updateOfferControllers } from '../controllers/restaurantController.js';

const restaurantRouter = Router();


restaurantRouter.get('/restaurant', getRestaurant);
restaurantRouter.post('/restaurant/menu', createMenu);
restaurantRouter.post('/restaurant/offer', createOffer);
restaurantRouter.get('/restaurant/single/:RestaurantId' , getSingleOfferController)
restaurantRouter.get('/restaurant/single/:RestaurantId' , getSingleMenuController)
restaurantRouter.put('/restaurant/update/menu/:RestaurantId' ,updateMenuControllers)
restaurantRouter.put('/restaurant/update/offer/:RestaurantId' ,updateOfferControllers)
restaurantRouter.delete('/restaurant/delete/:RestaurantId', deleteMenuController)





export default restaurantRouter;