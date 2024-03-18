import { Router } from 'express';
import { createServiceController, getAllServiceController } from '../controllers/serviceController.js';
// import { createServices } from '../controllers/serviceController.js';

const serviceRouter = Router();

serviceRouter.get('/service', getAllServiceController);
serviceRouter.post('/service', createServiceController);


export default serviceRouter;


