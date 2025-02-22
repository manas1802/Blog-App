import express from "express";
import authRouter from "./routes/authRoutes.js";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./config/mongodb.js";
import cookieParser from "cookie-parser";
import userRouter from "./routes/userRoutes.js";
import blogRouter from "./routes/blogRoutes.js";
import cors from "cors";

await connectDB();

const app = express();


app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true, // Required for cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));


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
