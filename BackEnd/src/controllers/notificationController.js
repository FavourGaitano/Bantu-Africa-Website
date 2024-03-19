import { deleteNotificationService, getAllBookingsNotificationsService, getAllNotificationsService, getAllSingleNotificationsService } from "../services/notificationService.js";

export const getAllBookingNotificationsController = async (req, res) => {
    try {
      const {BookingId}=req.params
      console.log(BookingId);
      const results = await   getAllBookingsNotificationsService(BookingId)
      console.log(results);
       if(results.rowsAffected>0){
        const notifications=results.recordset
        console.log("notifications",notifications);
      res.status(200).json( notifications );
       }else{
        return res.status(400).send({message: "No existing notifications"});
       }
    } catch (error) {
      console.error("Error fetching all notifications:", error);
      res.status(500).json("Internal server error");
    }
  };

  export const getAllNotificationsController = async (req, res) => {
    try {
      const results = await getAllNotificationsService()
       if(results.rowsAffected>0){
        const Notifications=results.recordset
        res.status(200).json( Notifications );
       }else{
        res.status(400).json({ message: "No Notifications" });
       }
    } catch (error) {
      console.error("Error fetching all Notifications:", error);
      res.status(500).json("Internal server error");
    }
  };
  export const updateNotificationsController = async (req, res) => {
    try {
      const {is_read}=req.body
      const {NotificationId}=req.params
      console.log(NotificationId);
      const results = await updateNotificationService({NotificationId,is_read})
      console.log(results);
       if(results.rowsAffected>0){
      res.status(200).json( "Notification has been read" );
       }else{
        return res.status(400).send({message: "No existing notifications"});
       }
    } catch (error) {
      console.error("Error updating the notifications:", error);
      res.status(500).json("Internal server error");
    }
  };
  
  export const deleteNotificationController=async(req,res)=>{
    try {
      
      const {BookingId,NotificationId}=req.params
      console.log(req.params);
      const existingNotification=await getAllSingleNotificationsService(NotificationId)
      if(existingNotification.rowsAffected>0){
  const result=await deleteNotificationService({BookingId,NotificationId})
      console.log("deletedNotifications",result.rowsAffected);
      if(result.rowsAffected>0){
        return res.status(200).json("Deleted successfully")
      }else{
        return res.status(400).json("Failed to delete the notification")
      }
      }else{
        return res.status(400).json("The notification does not exist")
      }
    
    } catch (error) {
      
    }
  }