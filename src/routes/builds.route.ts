import { Router } from "express";
import { createBuild,deleteBuild,getBuild,getBuilds,updateBuild } from "../controllers/builds.controller";

const router = Router();

router.get('/builds', getBuilds)
router.post('/builds', createBuild)
router.put('/builds/:id', updateBuild)
router.delete('/builds/:id', deleteBuild)
router.get('/builds/:id', getBuild)

export default router;