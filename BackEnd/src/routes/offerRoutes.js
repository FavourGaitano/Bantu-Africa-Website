import { Router } from "express";
import { addOfferController, deleteOfferController, getAllOffersController, getOneOfferController, updateOfferController } from "../controllers/offersControntroller.js";

const offerRouter = Router();



offerRouter.get('/offer', getAllOffersController);
offerRouter.post('/offer', addOfferController);
offerRouter.put('/offer/update/:OfferId', updateOfferController );
offerRouter.get('/offer/single/:OfferId', getOneOfferController);
offerRouter.delete('/offer/delete/:OfferId', deleteOfferController);



export default offerRouter;