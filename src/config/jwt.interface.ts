import { JwtPayload } from "jsonwebtoken";

export interface CustomJWTPayload extends JwtPayload {
  id: string;
  name: string;
  email: string;
  password: string;
}