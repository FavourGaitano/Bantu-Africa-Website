import joi from "joi";

export const meetingValidator = (meeting) => {
  const meetingValidatorSchema = joi.object({
    Description: joi.string().required(),
    ConferenceRoomName: joi.string().required(),
    Image: joi.string().required(),
    Price: joi.string().required(),
    Quantity: joi.string().optional(),
  });
  return meetingValidatorSchema.validate(meeting);
};
