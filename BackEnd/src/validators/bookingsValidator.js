import joi from "joi";

export const bookingsValidator = (booking) => {
  const bookingsValidatorSchema = joi.object({
    Email: joi.string().email().required(),
    FirstName: joi.string().required(),
    LastName: joi.string().required(),
    StartDate: joi.date(),
    EndDate: joi.date(),
    SpecialRequirements: joi.string().default("None"),
    AdultsNo: joi.number().required(),
    KidsNo: joi.number(),
    MealPlan: joi.string().required(),
    Name: joi.string().required(),
    Size: joi.string().required(),
  });
  return bookingsValidatorSchema.validate(booking);
};
