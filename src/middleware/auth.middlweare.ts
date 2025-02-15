import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/user.model';
import { CustomJWTPayload } from '../config/jwt.interface';

export interface AuthRequest extends Request{
  user? : {id: string}
}

export const authenticateToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')){
      return res.status(400).json({
        message: "Access denied. No token provided."
      })
    }
    const token = authHeader.split(' ')[1];
    const secretKey = process.env.JWT_SECRET || "donij-aehd-ncilakejo-dudfo-dfnls-dmaasd-d";
    const decodedToken = jwt.verify(token, secretKey) as CustomJWTPayload
    const authenticatedUser = await UserModel.findById(decodedToken.id).select("-password");
    if (!authenticatedUser) {
      return res.status(401).json({
          message: "No user found! Invalid token."
      });
    }
    req.user = {id: authenticatedUser.id}
    next()
  }
  catch (error:any){
    res.status(400).json({ message: "Invalid token" });
    next(error)
  }
}