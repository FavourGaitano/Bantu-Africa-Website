import { Router } from 'express';
import { createServiceController, deleteServiceController, getAllServiceController } from '../controllers/serviceController.js';

const serviceRouter = Router();

serviceRouter.get('/service', getAllServiceController);
serviceRouter.post('/service', createServiceController);
serviceRouter.delete('/service/:ServiceId', deleteServiceController);


export default serviceRouter;


