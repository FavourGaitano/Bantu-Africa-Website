import { Router } from "express";
import {
  createBooking,
  deleteBooking,
  getBookingById,
  getBookingByRoomId,
  getBookingPrice,
  getBookings,
  getBookingsByEmail,
  getBookingsByName,
  updateBooking,
} from "../controllers/bookingsController.js";
// import { getBookingsByRoomIdService } from "../services/bookingService.js";

const bookingsRouter = Router();

bookingsRouter.post("/new/booking", createBooking);
bookingsRouter.get("/booking/:name/:size/:mealplan", getBookingPrice);
bookingsRouter.get("/bookings", getBookings);
bookingsRouter.get("/bookings/:id", getBookingById);
bookingsRouter.get("/:email/bookings", getBookingsByEmail);
bookingsRouter.get("/:firstname/:lastname", getBookingsByName);
bookingsRouter.get("/booking/room/:id", getBookingByRoomId);
bookingsRouter.put("/booking/update/:id", updateBooking);
bookingsRouter.delete("/booking/delete/:id", deleteBooking);

export default bookingsRouter;
