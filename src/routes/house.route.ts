import { Router } from "express";
import {
  createHouse,
  deleteHouse,
  getHouse,
  getHouses,
  updateHouse,
} from "../controllers/house.controller";

const router = Router();

router.get("/houses", getHouses);
router.post("/houses", createHouse);
router.put("/houses/:id", updateHouse);
router.delete("/houses/:id", deleteHouse);
router.get("/houses/:id", getHouse);

export default router;
