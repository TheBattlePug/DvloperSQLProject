require("dotenv").config();
import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import { connectDB, sequelize } from "./db";

import router from './routes';
import courseRouter from './routes'
import { studentRouter, enrollmentRouter } from "./routes";

const app = express();

app.use(express.json({ limit: "10kb" }));
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.use(
  cors({
    origin: ["http://localhost:4200"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200'); // Replace with the actual origin of your Angular app
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


app.get("/api/healthchecker", (req: Request, res: Response) => {
  res.status(200).json({
    status: "success",
    message: "Build CRUD API with Node.js and Sequelize",
  });
});

app.use("/api/students", studentRouter)
app.use("/api/courses", courseRouter)
app.use("/api/enrollments", enrollmentRouter)

app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    status: "fail",
    message: `Route: ${req.originalUrl} does not exist on this server`,
  });
});


const PORT = 8000;
app.listen(PORT, async () => {
  console.log("🚀Server started Successfully");
  await connectDB();
  sequelize.sync({ force: false }).then(() => {
    console.log("✅Synced database successfully...");
  });
});
