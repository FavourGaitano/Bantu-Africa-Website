import joi from 'joi';

export const offerValidator = (offer) => {
    const offerValidatorSchema = joi.object({
        OfferImageUrl: joi.string().required()
    });
    return offerValidatorSchema.validate(offer);
}

export const updateOfferValidator = (updateOffer) => {
    const updateOfferValidatorSchema = joi.object({
        OfferImageUrl: joi.string().required()

    });
    return updateOfferValidatorSchema.validate(updateOffer);
}
