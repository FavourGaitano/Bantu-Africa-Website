import joi from "joi";

export const inquiriesvalidator = (inquiry) => {
  const inquiriesValidatorSchema = joi.object({
    Email: joi.string().required(),
    Description: joi.string().required(),
    Status: joi.string(),
  });
  return inquiriesValidatorSchema.validate(inquiry);
};
