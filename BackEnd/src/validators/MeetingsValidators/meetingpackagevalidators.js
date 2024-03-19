import joi from "joi";

export const meetingpackagepackageValidator = (meetingpackage) => {
  const packageValidatorSchema = joi.object({
    PackageName: joi.string().required(),
  });
  return packageValidatorSchema.validate(meetingpackage);
};
