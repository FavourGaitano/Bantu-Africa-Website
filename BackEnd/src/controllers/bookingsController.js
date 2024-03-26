import nodemailer from "nodemailer";
import dotenv from "dotenv";
import logger from "../utils/logger.js";
import { v4 } from "uuid";
import { bookingsValidator } from "../validators/bookingsValidator.js";
import {
  checkIfValuesIsEmptyNullUndefined,
  sendBadRequest,
  sendCreated,
  sendDeleteSuccess,
  sendNotFound,
  sendServerError,
} from "../helper/helperFunctions.js";
import {
  createBookingService,
  deleteBookingService,
  getBookingByIdService,
  getBookingPriceService,
  getBookingsByEmailService,
  getBookingsByNameService,
  getBookingsByRoomIdService,
  getBookingsService,
  updateBookingService,
} from "../services/bookingService.js";
import {
  getRoomByIdService,
  getRoomsAvailableForBookingService,
  isAvailableService,
} from "../services/roomService.js";
import { findRoomCategoryService } from "../services/roomCategoryService.js";

export const createBooking = async (req, res) => {
  const {
    Email,
    FirstName,
    LastName,
    SpecialRequirements,
    StartDate,
    EndDate,
    AdultsNo,
    KidsNo,
    MealPlan,
    Name,
    Size,
  } = req.body;
  // console.log("Frontend inputs: ", req.body);
  const { error } = bookingsValidator(req.body);
  if (error) {
    console.log("validation error:", error);
    return res.status(400).send("Invalid inputs");
  } else {
    try {
      const BookingId = v4();
      const CreatedAt = new Date();

      const availableRooms = await getRoomsAvailableForBookingService({
        Name,
        Size,
        StartDate,
        EndDate,
      });
      if (availableRooms.length === 0) {
        sendNotFound(
          res,
          `Sorry, all our ${Name} ${Size} rooms are booked for these dates`
        );
        return;
      }

      // console.log("AvailableRooms: ", availableRooms);
      const RoomId = availableRooms[0].RoomId;

      const roomToBook = await getRoomByIdService(RoomId);
      // console.log("booked room: ", roomToBook);

      if (roomToBook.length === 0) {
        sendNotFound(res, "Room not found");
        return;
      }

      const totalOccupants = AdultsNo + KidsNo;
      if (totalOccupants > roomToBook[0].Occupants) {
        // console.log("Check reached");
        sendBadRequest(
          res,
          "The total number of guests exceeds the maximum occupancy for this room. Please select another room."
        );
        return;
      }

      const IsReserved = true;
      const IsPaid = false;
      const category = await findRoomCategoryService({ Name, MealPlan, Size });
      console.log("Category is: ", category);
      if (!category) {
        sendNotFound("No room fitting the bill found");
        return;
      }

      const stayDuration = Math.abs(new Date(EndDate)) - new Date(StartDate);
      const days = Math.ceil(stayDuration / (1000 * 60 * 60 * 24));
      const Total = category.Price * days;
      console.log("Total is: ", Total);
      const newBooking = {
        BookingId,
        Email,
        FirstName,
        LastName,
        RoomId,
        SpecialRequirements,
        CreatedAt,
        StartDate,
        EndDate,
        AdultsNo,
        KidsNo,
        MealPlan,
        Total,
        IsReserved,
        IsPaid,
      };

      const response = await createBookingService(newBooking);
      if (response.message) {
        sendServerError(res, response.message);
        return;
      } else {
        sendMail(
          newBooking.FirstName,
          newBooking.LastName,
          newBooking.Email,
          newBooking.StartDate,
          newBooking.EndDate
        );
        sendCreated(res, "Booking created successfully");
      }
    } catch (error) {
      return error;
    }
  }
};

export const sendMail = async (
  FirstName,
  LastName,
  Email,
  StartDate,
  EndDate,

  req,
  res
) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to: Email,
    subject: "Welcome to Bantu Africa",
    html: `Hi, ${FirstName} ${LastName}! Thank you for booking a reservation with the Bantu Africa Resort. 
      We are thrilled to host you from ${StartDate} to ${EndDate}. 
      To confirm your booking and complete the payment, please contact our reception desk at XXX`,
    //html: emailTemp,
  };
  try {
    logger.info("Sending mail...");
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        logger.error(error);
        res.status(500).send(error);
      } else {
        logger.info(`Email sent: ${info.response}`);
        res.status(200).send(info.response);
      }
    });
  } catch (error) {
    logger.error(error);
  }
};

export const getBookingPrice = async (req, res) => {
  const { name, mealplan, size } = req.params;
  try {
    const price = await getBookingPriceService({ name, mealplan, size });
    if (!price) {
      sendNotFound(res, "No such room found");
      return;
    } else {
      res.status(200).json(price);
    }
  } catch (error) {
    sendServerError(res, error);
  }
};

export const getBookings = async (req, res) => {
  try {
    const data = await getBookingsService();
    if (data.length == 0) {
      sendNotFound(res, "No bookings found");
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    sendServerError(res, error);
  }
};

export const getBookingById = async (req, res) => {
  const BookingId = req.params.id;
  try {
    const data = await getBookingByIdService(BookingId);
    if (!data) {
      sendNotFound(res, "Booking not found");
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    sendServerError(res, error);
  }
};

export const getBookingsByEmail = async (req, res) => {
  const Email = req.params.email;
  //   console.log(Email);
  try {
    const data = await getBookingsByEmailService(Email);
    if (data.length == 0) {
      sendNotFound(res, "No bookings found");
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    sendServerError(res, error);
  }
};

export const getBookingsByName = async (req, res) => {
  const { firstname, lastname } = req.params;
  //   console.log(req.params);
  try {
    const data = await getBookingsByNameService(firstname, lastname);
    if (data.length == 0) {
      sendNotFound(res, "No bookings found");
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    sendServerError(res, error);
  }
};

export const getBookingByRoomId = async (req, res) => {
  const RoomId = req.params.id;
  //   console.log(req.params);
  try {
    const data = await getBookingsByRoomIdService(RoomId);
    console.log("data ni: ", data);
    if (!data || data === undefined) {
      sendNotFound(res, "No booking found");
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
    console.log(error);
    sendServerError(res, error);
  }
};

export const updateBooking = async (req, res) => {
  const BookingId = req.params.id;
  try {
    const bookingToUpdate = await getBookingByIdService(BookingId);
    if (!bookingToUpdate) {
      sendNotFound(res, "Booking to update not found");
    } else {
      if (checkIfValuesIsEmptyNullUndefined(req, res, req.body)) {
        const {
          Email,
          FirstName,
          LastName,
          RoomId,
          SpecialRequirements,
          StartDate,
          EndDate,
          AdultsNo,
          KidsNo,
          MealPlan,
          Total,
          IsReserved,
          IsPaid,
        } = req.body;
        const CreatedAt = new Date();
        const updatedBooking = {
          Email,
          FirstName,
          LastName,
          RoomId,
          SpecialRequirements,
          CreatedAt,
          StartDate,
          EndDate,
          AdultsNo,
          KidsNo,
          MealPlan,
          Total,
          IsReserved,
          IsPaid,
        };
        if (Email) {
          updatedBooking.Email = Email;
        }
        if (FirstName) {
          updatedBooking.FirstName = FirstName;
        }
        if (LastName) {
          updatedBooking.LastName = LastName;
        }
        if (RoomId) {
          updatedBooking.RoomId = RoomId;
        }
        if (SpecialRequirements) {
          updatedBooking.SpecialRequirements = SpecialRequirements;
        }
        if (StartDate) {
          updatedBooking.StartDate = StartDate;
        }
        if (EndDate) {
          updatedBooking.EndDate = EndDate;
        }
        if (AdultsNo) {
          updatedBooking.AdultsNo = AdultsNo;
        }
        if (KidsNo) {
          updatedBooking.KidsNo = KidsNo;
        }
        if (MealPlan) {
          updatedBooking.MealPlan = MealPlan;
        }
        if (Total) {
          updatedBooking.Total = Total;
        }
        if (IsReserved) {
          updatedBooking.IsReserved = IsReserved;
        }
        if (IsPaid) {
          updatedBooking.IsPaid = IsPaid;
          if (IsPaid == true) {
            console.log("Room id is:", RoomId);
            await isAvailableService(RoomId);
          }
        }
        const totalOccupants = AdultsNo + KidsNo;
        const roomToBook = await getRoomByIdService(RoomId);
        // console.log(roomToBook);

        if (totalOccupants > roomToBook.Occupants) {
          // console.log("Check reached");
          res
            .status(400)
            .send(
              "The total number of guests exceeds the maximum occupancy for this room. Please select another room."
            );
          return;
        }
        if (!roomToBook.isAvailable) {
          console.log("Entered date check");
          res
            .status(400)
            .send(
              "This room is already booked for these dates. Please select another."
            );
          return;
        } else {
          await updateBookingService(BookingId, updatedBooking);
          sendCreated(res, "Booking updated successfully");
        }
      } else {
        sendBadRequest(res, "Please provide a complete field");
      }
    }
  } catch (error) {
    sendServerError(res, error);
  }
};

export const deleteBooking = async (req, res) => {
  const BookingId = req.params.id;
  try {
    const bookingToDelete = await getBookingByIdService(BookingId);
    if (!bookingToDelete) {
      sendNotFound(res, "Booking to delete not found");
    } else {
      await deleteBookingService(BookingId);
      sendDeleteSuccess(res, "Booking deleted successfully");
    }
  } catch (error) {}
};
