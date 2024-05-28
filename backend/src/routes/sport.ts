import { Router } from "express";
import { addSport, deleteSport, getAllSports, getSport, updateSport } from "../controllers/sportcontroller";

const sportRouter = Router();

sportRouter.get("/", getAllSports);
sportRouter.post("/", addSport);
sportRouter.get("/:id", getSport);
sportRouter.put("/:id", updateSport);
sportRouter.delete("/:id", deleteSport);

export default sportRouter;