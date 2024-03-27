import { getRoomsAvailableForBookingService } from "../services/roomService";

export const getAvailableRooms = async ({ booking }) => {
  const availableRooms = await getRoomsAvailableForBookingService(
    booking.Name,
    booking.Size,
    booking.StartDate,
    booking.EndDate
  );
  return availableRooms;
};
