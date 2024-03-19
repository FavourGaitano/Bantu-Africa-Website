import joi from 'joi';

export const roomCategoryValidator = (roomCategory) => {
    const roomCategoryValidatorSchema = joi.object({
        Name: joi.string().required(),
        MealPlan: joi.string().required(),
        Size: joi.string().required(),
        Price: joi.number().required()
    });
    return roomCategoryValidatorSchema.validate(roomCategory);
}

export const updateCategoryRoomValidator = (updateRoomCategory) => {
    const updateRoomValidatorSchema = joi.object({
        Name: joi.string().required(),
        MealPlan: joi.string().required(),
        Size: joi.string().required(),
        Price: joi.number().required()
    });
    return updateRoomValidatorSchema.validate(updateRoomCategory);
}
