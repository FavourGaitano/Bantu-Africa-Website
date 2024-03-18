import { Router } from 'express';
import { getAllServiceController } from '../controllers/serviceController.js';
// import { createServices } from '../controllers/serviceController.js';

const serviceRouter = Router();

serviceRouter.get('/service', getAllServiceController);


export default serviceRouter;


