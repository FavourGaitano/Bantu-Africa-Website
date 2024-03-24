import { Router } from 'express';
import { createOtherServiceController, getAllOtherServicesController, updateOtherServiceController } from '../controllers/otherServicesController.js';

const otherServiceRouter = Router();

otherServiceRouter.post('/otherService', createOtherServiceController);
otherServiceRouter.get('/otherService', getAllOtherServicesController);
otherServiceRouter.put('/otherService/:OtherServiceId', updateOtherServiceController);


export default otherServiceRouter;