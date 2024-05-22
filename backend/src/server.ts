import app from "./app";
import dotenv from "dotenv";
import connectSportDB from "../src/db/db";

dotenv.config();
const port = process.env.PORT || 3000;

connectSportDB;

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
