import { NextFunction, Request, Response } from "express";
import logger from "../config/logger";


const requestLogger = (
  req:Request, 
  res:Response, 
  next:NextFunction
) => {
  logger.info("Incoming Request", {
    method: req.method,
    path: req.path,
    query: req.query
  });
  next()
}


export default requestLogger