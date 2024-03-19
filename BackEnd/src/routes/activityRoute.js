import { Router } from 'express';
import {  createActivityController, getAllActivitiesController, getSingleActivityController } from '../controllers/activityController.js';

const activityRouter = Router();

activityRouter.post('/activity', createActivityController);
activityRouter.get('/activity', getAllActivitiesController);
activityRouter.get('/activity/:ActivityId', getSingleActivityController);


export default activityRouter;

