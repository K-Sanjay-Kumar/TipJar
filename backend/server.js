import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import userRoutes from './routes/user-routes.js';
import postRoutes from './routes/posts-routes.js';
import adminRoutes from './routes/admin-routes.js';
import path from 'path';

dotenv.config();

const app = express();
const __dirname = path.resolve();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/admin", adminRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, '/frontend/dist')));

    // Serve static files from 'public' directory for images
    app.use('/images', express.static(path.join(__dirname, '/frontend/public/images')));

    app.get('*', (req, res) =>{
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    } )
}


app.listen(5000, () =>{
    connectDB();
    console.log("server started at localhost:5000");
});
