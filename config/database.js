import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/vibe', {
      useNewUrlParser: true, //WTF is this??
      useUnifiedTopology: true,// ??
    });
    console.log('💽 Database connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;