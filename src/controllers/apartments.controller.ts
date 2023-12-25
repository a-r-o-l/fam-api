import { Request, Response } from 'express';
import {Apartment} from "../models/Apartment";   
import { Model } from 'sequelize'; // Import the Model type from Sequelize

type Apartment = {
    number: string,
    rented: Date,
    value:BigInteger
    buildId?:BigInteger
}

export const getApartments = async(req: Request, res: Response) => {
    try {
        const tasks = await Apartment.findAll();
        res.json(tasks)
    } catch (error: unknown) {
        return res.status(500).json({message: (error as Error).message})
    }
}

export const getApartment = async (req: Request, res:Response) => {
    try {
        const {id} = req.params;
        const foundApartment = await Apartment.findOne({where: {id}});
        if(!foundApartment) return res.status(404).json({message: "Apartment not found"});
        res.json(foundApartment);
    } catch (error: unknown) {
        return res.status(500).json({message: (error as Error).message})
    }
}

export const createApartment = async(req: Request, res: Response) => {
    const {number, rented, value, buildId} = req.body;
try {
    const newApartment =  await Apartment.create({number,rented,value,buildId})
    res.json(newApartment);
    
} catch (error: unknown) {
    return res.status(500).json({message: (error as Error).message})
}
}

export const updateApartment = async(req: Request, res: Response) => {
    try {
    const {number,rented,value,buildId} = req.body;
    const {id} = req.params;
    const foundApartment =  await Apartment.findByPk(id) as Model<Apartment> | null;
    if(!foundApartment)return res.status(404).json({message: "Apartment not found"});
    (foundApartment as unknown as Apartment).number = number;
    (foundApartment as unknown as Apartment).rented = rented;
    (foundApartment as unknown as Apartment).value = value;
    (foundApartment as unknown as Apartment).buildId = buildId;
    foundApartment.save();
    res.json(foundApartment);
} catch (error: unknown) {
    return res.status(500).json({message: (error as Error).message})
}
}

export const deleteApartment = async(req: Request, res: Response) => {
    try {
    const {id} = req.params;
    await Apartment.destroy({where: {id}})
    res.sendStatus(204);
} catch (error: unknown) {
    return res.status(500).json({message: (error as Error).message})
}
}
