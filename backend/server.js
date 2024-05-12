import express from 'express';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectMongoDB from "./db/connectMongoDB.js";
import authRoutes from "./routes/auth.routes.js"

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000 // 8000

app.use(express.json()); // to parse req.body
app.use(express.urlencoded({ extended: true })); // to parse form data(urlencoded)

app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
    connectMongoDB();
    console.log(`server is running at port ${PORT}`);
})