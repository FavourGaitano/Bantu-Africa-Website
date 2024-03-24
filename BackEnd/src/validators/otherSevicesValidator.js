import joi from 'joi';

export const otherServiceValidator = (otherService) => {
    const otherServiceValidatorSchema = joi.object({
        OtherServiceName: joi.string().required(),
        Description: joi.string().required(),
        ImageUrl: joi.string().required()
    });

    return otherServiceValidatorSchema.validate(otherService);
};
