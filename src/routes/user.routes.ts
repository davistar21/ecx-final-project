import express from "express"
import { loginUser, registerUser } from "../controller/user.controller";
import { authenticateToken } from "../middleware/auth.middlweare";

const userRouter = express.Router();

userRouter.get('/', (req, res) => {
  res.send("User router is online")
})
userRouter.post('/register', registerUser)

userRouter.post('/login', loginUser)

export default userRouter;