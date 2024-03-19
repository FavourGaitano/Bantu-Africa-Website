import joi from 'joi';

export const activityValidator = (activity) => {
    const activityValidatorSchema = joi.object({
        ActivityName: joi.string().required(),
        Description: joi.string().required(),
        ImageUrl: joi.string().required(),
        Category: joi.string().required()
    });

    return activityValidatorSchema.validate(activity);
}
