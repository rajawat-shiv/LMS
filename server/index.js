import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/connectDB.js";
import userRoute from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import courseRoute from "./routes/course.routes.js";
import mediaRoute from "./routes/media.routes.js";
import purchaseRoute from "./routes/purchaseCourse.routes.js";
import courseProgressRoute from "./routes/courseProgress.routes.js";
import path from 'path'

dotenv.config({});

connectDB();
const app = express();

const PORT = process.env.PORT || 3000;
const _dirname = path.resolve();

// default middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//api
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/media", mediaRoute);
app.use("/api/v1/purchase", purchaseRoute);
app.use("/api/v1/progress", courseProgressRoute);

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get('*', (_,res) =>{
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

app.listen(PORT, () => {
  console.log(`server listen at port  ${PORT}`);
});
