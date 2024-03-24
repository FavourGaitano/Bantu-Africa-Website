import { Router } from 'express';
import { createOtherServiceController } from '../controllers/otherServicesController.js';

const otherServiceRouter = Router();

otherServiceRouter.post('/otherService', createOtherServiceController);
// otherServiceRouter.get('/otherService', getAllOtherServiceController);


export default otherServiceRouter;