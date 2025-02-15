import { NextFunction, Request, Response } from "express";
import UserModel from "../models/user.model";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { loginSchema, registerSchema } from "../middleware/user.validate.middleware";


export const registerUser = async (
  req: Request,
  res: Response, 
  next: NextFunction
) => {
  const {error} = registerSchema.validate(req.body);
  if (error) {
    res.status(400).json({
      message: error.details[0].message
    })
    return next(new Error(error.details[0].message))
  }
  try{
    const {username, email, password} = req.body;
    const userExists = await UserModel.findOne({email});
    if (userExists){
      return next (new Error('User already registered. Please login!'));
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await UserModel.create({
      username,
      email,
      password: hashedPassword
    });

    if (!newUser) {
      return (new Error('Invalid User Data'));
    }
    const token = generateToken(newUser.id)
    res.status(200).json({
      _id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      token
    })
  } 
  catch (error){
    next(error)
  }
}

export const loginUser = async (
  req: Request,
  res: Response, 
  next: NextFunction
) => {
  const {error} = loginSchema.validate(req.body);
  if (error){
    res.status(400).json({
      message: error.details[0].message
    })
    return next (new Error (error.details[0].message))
  }

  try {
    const {email, password} = req.body;
    const user = await UserModel.findOne({email});
    if (!user || !(await bcrypt.compare(password, user.password))) {
      res.status(400).send('Invalid credentials')
      return next (new Error ('Invalid credentials!'))
    }
    const token = generateToken(user?.id);
    res.status(200).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token
    })
  }
  catch (error){
    next(error)
  }
}


const generateToken = (id: string) => {
  const secretKey: string = process.env.JWT_SECRET || "donij-aehd-ncilakejo-dudfo-dfnls-dmaasd-d";
  return jwt.sign({id}, secretKey, { expiresIn: '1h' });
};
