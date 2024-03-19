import { Router } from 'express';
import {  createActivityController, deleteActivityController, getAllActivitiesController, getSingleActivityController } from '../controllers/activityController.js';

const activityRouter = Router();

activityRouter.post('/activity', createActivityController);
activityRouter.get('/activity', getAllActivitiesController);
activityRouter.get('/activity/:ActivityId', getSingleActivityController);
activityRouter.delete('/activity/:ActivityId', deleteActivityController);


export default activityRouter;

