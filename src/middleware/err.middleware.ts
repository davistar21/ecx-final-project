export class AppError extends Error{
  constructor(
    public statusCode: number,
    public message: string,
    public isOperational = true
  ) {
    super(message);
    Object.setPrototypeOf(this, AppError.prototype)
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details: string[] = []) {
    super(400, message); 
    this.details = details;
    Object.setPrototypeOf(this, ValidationError.prototype); 
  }

  details: string[];
}


