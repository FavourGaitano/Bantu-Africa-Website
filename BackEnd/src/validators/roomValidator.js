import joi from 'joi';

export const roomValidator = (room) => {
    const roomValidatorSchema = joi.object({
        RoomPhotoUrl: joi.string().required(),
        description: joi.string().required(),
        RoomCategoryId: joi.string().required(),
        Occupants: joi.string().required(),
        RoomNumber: joi.number().required()
    });
    return roomValidatorSchema.validate(room);
}

export const updateRoomValidator = (updateRoom) => {
    const updateRoomValidatorSchema = joi.object({
        RoomPhotoUrl: joi.string().required(),
        description: joi.string().required(),
        Occupants: joi.string().required(),
        RoomNumber: joi.number().required()
    });
    return updateRoomValidatorSchema.validate(updateRoom);
}
