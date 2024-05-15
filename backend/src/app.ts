// src/index.js
import express, { Express, Request, Response } from "express";
import userRouter from "./routes/users";
import sportRouter from "./routes/sport";
import connectSportDB from "./db/db";

connectSportDB;

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/users", userRouter);
app.use("/api/sports", sportRouter);
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

export default app;