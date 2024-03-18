import joi from 'joi';

export const roomValidator = (room) => {
    const roomValidatorSchema = joi.object({
        RoomName: joi.string().required(),
        description: joi.string().required(),
        RoomCategory: joi.string().required(),
        RoomNumber: joi.number().required()
    });
    return roomValidatorSchema.validate(room);
}

