import { Router } from 'express';
import { createServiceController, deleteServiceController, getAllServiceController, getSingleServiceController, updateServiceController } from '../controllers/serviceController.js';

const serviceRouter = Router();

serviceRouter.get('/service', getAllServiceController);
serviceRouter.get('/service/:ServiceId', getSingleServiceController);
serviceRouter.post('/service', createServiceController);
serviceRouter.delete('/service/:ServiceId', deleteServiceController);
serviceRouter.put('/service/:ServiceId', updateServiceController);


export default serviceRouter;


