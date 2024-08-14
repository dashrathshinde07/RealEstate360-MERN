import express from "express";
import cors from "cors";
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";

// Load environment variables
dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL, // Ensure this matches the front-end URL
    credentials: true, // Allow credentials (cookies, etc.)
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/posts", postRoute);
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/test", testRoute);

app.listen(8800, () => {
  console.log("Server is running");
});
