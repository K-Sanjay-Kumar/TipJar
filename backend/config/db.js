import mongoose from 'mongoose';

export const connectDB = async () => {
    const MONGO_URI="mongodb+srv://sanjaykumark8855:fJodJakNgYAlZ4Cx@cluster0.h1fhl.mongodb.net/Knowfinity?retryWrites=true&w=majority&appName=Cluster0"
    try{
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch(error){
        console.error(`Error: ${error.message}`);
        process.exit(1); //1 code means exit with failure, 0 means success
    }
}