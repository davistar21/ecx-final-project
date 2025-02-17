import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import logger from "./logger";
import { AppError, ValidationError } from "../middleware/err.middleware";


export const errorHandler: ErrorRequestHandler = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
):Promise<void> => {
  try{
    logger.error("Error: ", {
      message: error.message,
      stack: error.stack,
      path: req.path, 
      method: req.method,
    })

    if (error instanceof AppError) {
        res.status(error.statusCode).json({
          status: "error",
          message: error.message,
          ...(error instanceof ValidationError && {details: (error as ValidationError).details }),
        });
      return
    }
    
    res.status(500).json({
      status: "error",
      message: "Internal server error!"
    })
  }
  catch(error:any){
    res.status(500).json({
      status: "error",
      message: error.message,
    })
  }
}


