import express from 'express';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import  'dotenv/config';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';



const app = express();
const port = process.env.PORT || 4000;

// Connect to DB and Cloudinary
await connectDB();
await connectCloudinary();

// CORS config for frontend origins
const allowedOrigins = [
  'http://localhost:5174',
  'http://localhost:5173'

  ];

  app.use(express.json()); // Parse JSON bodies
  app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // Allow cookies to be sent
  })
);


//api endpoint
app.use('/api/admin' , adminRouter)
app.use('/api/doctor' , doctorRouter)
app.use('/api/user' , userRouter)



app.get('/',(req,res)=>{
    res.send('API WORKING')
})

export default app;
