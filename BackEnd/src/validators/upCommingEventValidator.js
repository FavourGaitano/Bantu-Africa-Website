import joi from "joi";

export const upcommingEventValidator = (upcommingEvent) => {
  const upcommingEventValidatorSchema = joi.object({
    Name: joi.string().required(),
    Description: joi.string().required(),
    PosterUrl: joi.string().required(),
    Date: joi.date().required(),
  });
  return upcommingEventValidatorSchema.validate(upcommingEvent);
};
