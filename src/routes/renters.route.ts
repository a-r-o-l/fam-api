import { Router } from "express";
import { createRenter,deleteRenter,getRenter,getRenters,updateRenter } from "../controllers/renters.controller";

const router = Router();

router.get('/renters', getRenters)
router.post('/renters', createRenter)
router.put('/renters/:id', updateRenter)
router.delete('/renters/:id', deleteRenter)
router.get('/renters/:id', getRenter)

export default router;