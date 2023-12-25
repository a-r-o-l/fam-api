import { Request, Response } from 'express';
import {Contract} from "../models/Contract";   
import { Model } from 'sequelize'; // Import the Model type from Sequelize

type Contract = {
    date_start: string,
    date_end: string,
    isExpired?: boolean,
    renterId?: number, 
    apartmentId?: number
}

export const getContracts = async(req: Request, res: Response) => {
    try {
        const contrats = await Contract.findAll();
        res.json(contrats)
    } catch (error: unknown) {
        return res.status(500).json({message: (error as Error).message})
    }
}

export const getContract = async (req: Request, res:Response) => {
    try {
        const {id} = req.params;
        const foundContrat = await Contract.findOne({where: {id}});
        if(!foundContrat) return res.status(404).json({message: "Contract not found"});
        res.json(foundContrat);
    } catch (error: unknown) {
        return res.status(500).json({message: (error as Error).message})
    }
}

export const createContract = async(req: Request, res: Response) => {
    const {date_start,date_end, isExpired,renterId, apartmentId } = req.body;
try {
    const newBuild =  await Contract.create({date_start, date_end, isExpired, renterId, apartmentId})
    res.json(newBuild);
    
} catch (error: unknown) {
    return res.status(500).json({message: (error as Error).message})
}
}

export const updateContract = async(req: Request, res: Response) => {
    try {
    const {date_start, date_end,isExpired,renterId, apartmentId} = req.body;
    const {id} = req.params;
    const foundContrat =  await Contract.findByPk(id) as Model<Contract> | null;
    if(!foundContrat)return res.status(404).json({message: "Contract not found"});
    (foundContrat as unknown as Contract).date_start = date_start;
    (foundContrat as unknown as Contract).date_end = date_end;
    (foundContrat as unknown as Contract).isExpired = isExpired;
    (foundContrat as unknown as Contract).renterId = renterId;
    (foundContrat as unknown as Contract).apartmentId = apartmentId;
    foundContrat.save();
    res.json(foundContrat);
} catch (error: unknown) {
    return res.status(500).json({message: (error as Error).message})
}
}

export const deleteContract = async(req: Request, res: Response) => {
    try {
    const {id} = req.params;
    await Contract.destroy({where: {id}})
    res.sendStatus(204);
} catch (error: unknown) {
    return res.status(500).json({message: (error as Error).message})
}
}
