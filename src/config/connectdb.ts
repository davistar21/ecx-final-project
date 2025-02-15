import mongoose from "mongoose";

import dotenv from "dotenv"

dotenv.config()

// const connectionString = process.env.MONGO_URL

export default async function connectDB(){
  try {
    await mongoose.connect('mongodb+srv://eyitayobembe:EHCK19TZraiQvcgt@users.dflqc.mongodb.net/?retryWrites=true&w=majority&appName=users').then(()=>{
      console.log("Connected database successfully!")
    })
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
// console.log(process.env.MONGO_URL)
// console.log(connectionString)