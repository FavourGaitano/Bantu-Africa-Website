import { Router } from 'express';
import {  createActivityController, deleteActivityController, getAllActivitiesController, getSingleActivityController, updateActivityController } from '../controllers/activityController.js';

const activityRouter = Router();

activityRouter.post('/activity', createActivityController);
activityRouter.get('/activity', getAllActivitiesController);
activityRouter.get('/activity/:ActivityId', getSingleActivityController);
activityRouter.delete('/activity/:ActivityId', deleteActivityController);
activityRouter.put('/activity/:ActivityId', updateActivityController);


export default activityRouter;

