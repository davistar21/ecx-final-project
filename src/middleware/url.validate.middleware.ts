import joi from 'joi';

export const originalUrlSchema = joi.object({
  originalUrl: joi.string().min(1).required()
})