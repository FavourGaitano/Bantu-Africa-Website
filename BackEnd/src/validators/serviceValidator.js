import joi from 'joi';

export const serviceValidator = (service) => {
    const serviceValidatorSchema = joi.object({
        ServiceName: joi.string().required(),
        Description: joi.string().required(),
        ImageUrl: joi.string().required()
    });

    return serviceValidatorSchema.validate(service);
}