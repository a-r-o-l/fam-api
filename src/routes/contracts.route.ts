import { Router } from "express";
import { createContract,deleteContract,getContract,getContracts,updateContract, getContractByApartment } from "../controllers/contracts.controller";

const router = Router();

router.get('/contracts', getContracts)
router.post('/contracts', createContract)
router.put('/contracts/:id', updateContract)
router.delete('/contracts/:id', deleteContract)
router.get('/contracts/:id', getContract)
router.get('/contracts/apartment/:id', getContractByApartment)

export default router;