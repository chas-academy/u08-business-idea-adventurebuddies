// src/index.js
import express, { Express, Request, Response } from "express";
import cors from "cors";

import eventRouter from "./routes/events";
import userRouter from "./routes/users";
import friendRouter from "./routes/friends";
import sportRouter from "./routes/sport";
import connectSportDB from "./db/db";
import path from "path";

connectSportDB;

const app: Express = express();

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use("/api/users", userRouter);
app.use("/api/sports", sportRouter);
app.use("/api/events", eventRouter);
app.use("/api/friends", friendRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

export default app;
