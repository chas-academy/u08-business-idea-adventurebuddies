// src/index.js
import express, { Express, Request, Response } from "express";
import connectSportDB from "./db/db";
import eventRouter from "./routes/events";

connectSportDB;

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/events", eventRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

export default app;