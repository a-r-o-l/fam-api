import { Router } from "express";
import { createBuild,deleteBuild,getBuild,getBuilds,updateBuild,getBuildApartments } from "../controllers/builds.controller";

const router = Router();

router.get('/builds', getBuilds)
router.post('/builds', createBuild)
router.put('/builds/:id', updateBuild)
router.delete('/builds/:id', deleteBuild)
router.get('/builds/:id', getBuild)
router.get('/builds/:id/apartments', getBuildApartments)

export default router;