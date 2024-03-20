import {Router} from 'express';
import { deleteNotificationController, getAllBookingNotificationsController, getAllNotificationsController, updateNotificationsController } from '../controllers/notificationController.js';

const notificationRouter=Router();


notificationRouter.get('/notifications', getAllNotificationsController )

notificationRouter.get('/notifications/bookings/:BookingId', getAllBookingNotificationsController )
notificationRouter.patch('/notifications/:NotificationId', updateNotificationsController )
notificationRouter.delete('/notifications/:NotificationId:BookingId', deleteNotificationController )


export default notificationRouter;

