import express from "express";
import authRouter from "./routes/authRoutes.js";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/mongodb.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js";
import blogRouter from "./routes/blogRoutes.js";

await connectDB();

const app = express();

const port = 3000;

app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req, res) => res.send("API is working"));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
