import { Router } from 'express';
import {  createActivityController, getAllActivitiesController } from '../controllers/activityController.js';

const activityRouter = Router();

activityRouter.post('/activity', createActivityController);
activityRouter.get('/activity', getAllActivitiesController);


export default activityRouter;

