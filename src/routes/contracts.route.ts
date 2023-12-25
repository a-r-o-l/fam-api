import { Router } from "express";
import { createContract,deleteContract,getContract,getContracts,updateContract } from "../controllers/contracts.controller";

const router = Router();

router.get('/contracts', getContracts)
router.post('/contracts', createContract)
router.put('/contracts/:id', updateContract)
router.delete('/contracts/:id', deleteContract)
router.get('/contracts/:id', getContract)

export default router;