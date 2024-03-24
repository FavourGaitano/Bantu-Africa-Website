import { Router } from 'express';
import { createOtherServiceController, getAllOtherServicesController } from '../controllers/otherServicesController.js';

const otherServiceRouter = Router();

otherServiceRouter.post('/otherService', createOtherServiceController);
otherServiceRouter.get('/otherService', getAllOtherServicesController);


export default otherServiceRouter;