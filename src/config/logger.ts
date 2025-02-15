import winston from "winston";

const logger = winston.createLogger({
  level: "info", //levels can be info, warning or error
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "error.logs", level: "error"}),
    new winston.transports.File({ filename: "combined.logs"}),
    new winston.transports.File({ filename: "detailed.logs", level: "silly"}),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
})

export default logger