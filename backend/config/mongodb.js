import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log('Database connected successfully');
    });

    mongoose.connection.on('error', (err) => {
      console.error(' MongoDB connection error:', err);
    });

    await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`);


  } catch (error) {
    console.error('DB connection failed:', error.message);
    process.exit(1);
  }
};

export default connectDB;