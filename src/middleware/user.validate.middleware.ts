import joi from "joi";
// import { Request, Response, NextFunction } from "express";

export const registerSchema = joi.object({
  username: joi.string().min(2).max(99).required(),
  email: joi.string().email().required(),
  password: joi.string().min(8).max(49).required()
})

export const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(8).max(49).required()
})


// export const validateParams = (schema: joi.ObjectSchema) => {
//    return (req: Request, res: Response, next: NextFunction)  => {
//     const {error} = schema.validate(req.params);
//     if (error) {
//       return res.status(400).json({message: error.details[0].message})
//     }
//     next()
//    }
// }

// export const userParamsSchema = joi.object({
//   userId: joi.string().required()
// })
