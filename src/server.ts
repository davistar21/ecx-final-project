import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/connectdb';
import userRouter from './routes/user.routes';
import urlRouter from './routes/url.routes';
import requestLogger from './middleware/request.logger';

dotenv.config()

const app = express();

connectDB();

app.use(express.json())
app.use(requestLogger)
app.use('/user', userRouter)
app.use('/url', urlRouter)

app.get('/', (req, res) => {
  res.send('URL Shortener API is running...')
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
