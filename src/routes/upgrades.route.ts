import { Router } from "express";
import {
  createUpgrade,
  deleteUpgrade,
  updateUpgrade,
} from "../controllers/upgrades/upgradeMutations";
import {
  getAllUpgrades,
  getUpgradeById,
} from "../controllers/upgrades/upgradeQueries";

const router = Router();

router.get("/upgrades", getAllUpgrades);
router.post("/upgrades", createUpgrade);
router.put("/upgrades/:id", updateUpgrade);
router.delete("/upgrades/:id", deleteUpgrade);
router.get("/upgrades/:id", getUpgradeById);

export default router;
