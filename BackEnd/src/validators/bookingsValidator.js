import joi from "joi";

export const bookingsValidator = (booking) => {
  const bookingsValidatorSchema = joi.object({
    Email: joi.string().email().required(),
    FirstName: joi.string().required(),
    LastName: joi.string().required(),
    RoomId: joi.string().required(),
    SpecialRequirements: joi.string(),
    StartDate: joi.date(),
    EndDate: joi.date(),
    AdultsNo: joi.number().required(),
    KidsNo: joi.number(),
    Total: joi.number().required(),
    IsReserved: joi.boolean(),
    IsPaid: joi.boolean(),
  });
  return bookingsValidatorSchema.validate(booking);
};
