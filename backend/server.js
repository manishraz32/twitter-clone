import express from 'express';
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import path from "path";
import { v2 as cloudinary } from "cloudinary";


import authRoutes from "./routes/auth.routes.js"
import usersRoutes from "./routes/user.routes.js"
import postRoutes from "./routes/post.routes.js";
import notificationRoutes from "./routes/notification.route.js";


import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = process.env.PORT || 5000 // 8000
const __dirname = path.resolve();

app.use(express.json()); // to parse req.body
app.use(express.urlencoded({ extended: true })); // to parse form data(urlencoded)

app.use(cookieParser({ limit: "5mb" }));

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
	connectMongoDB();
	console.log(`server is running at port ${PORT}`);
})