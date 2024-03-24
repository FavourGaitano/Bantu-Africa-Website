import { Router } from 'express';
import { createOtherServiceController, deleteOtherServiceController, getAllOtherServicesController, updateOtherServiceController } from '../controllers/otherServicesController.js';

const otherServiceRouter = Router();

otherServiceRouter.post('/otherService', createOtherServiceController);
otherServiceRouter.get('/otherService', getAllOtherServicesController);
otherServiceRouter.put('/otherService/:OtherServiceId', updateOtherServiceController);
otherServiceRouter.delete('/otherService/:OtherServiceId', deleteOtherServiceController);


export default otherServiceRouter;