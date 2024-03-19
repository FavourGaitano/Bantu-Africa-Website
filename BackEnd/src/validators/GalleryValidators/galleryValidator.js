import joi from "joi";

export const galleryValidator = (gallery) => {
  const galleryValidatorSchema = joi.object({
    Description: joi.string().required(),
    Category: joi.string().required(),
    PictureUrl: joi.string().required(),
  });
  return galleryValidatorSchema.validate(gallery);
};
