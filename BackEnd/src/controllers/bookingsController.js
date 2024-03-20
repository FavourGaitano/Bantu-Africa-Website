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
  getBookingsByEmailService,
  getBookingsByNameService,
  getBookingsByRoomIdService,
  getBookingsService,
  updateBookingService,
} from "../services/bookingService.js";
import {
  getRoomByIdService,
  isAvailableService,
} from "../services/roomService.js";

export const createBooking = async (req, res) => {
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
    Total,
    IsReserved,
    IsPaid,
  } = req.body;
  const { error } = bookingsValidator(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {
    try {
      const BookingId = v4();
      const CreatedAt = new Date();
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
        Total,
        IsReserved,
        IsPaid,
      };
      const totalOccupants = AdultsNo + KidsNo;
      const roomToBook = await getRoomByIdService(RoomId);
      console.log(roomToBook);

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
        const response = await createBookingService(newBooking);
        if (response.message) {
          sendServerError(res, response.message);
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
    if (data.length == 0) {
      sendNotFound(res, "No booking found");
    } else {
      res.status(200).json(data);
    }
  } catch (error) {
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
