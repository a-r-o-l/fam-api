import { Request, Response } from 'express';
import {Build} from "../models/Build";   
import { Model } from 'sequelize'; // Import the Model type from Sequelize

type Build = {
    address: string,
    name: string,
}

export const getBuilds = async(req: Request, res: Response) => {
    try {
        const builds = await Build.findAll();
        res.json(builds)
    } catch (error: unknown) {
        return res.status(500).json({message: (error as Error).message})
    }
}

export const getBuild = async (req: Request, res:Response) => {
    try {
        const {id} = req.params;
        const foundBuild = await Build.findOne({where: {id}});
        if(!foundBuild) return res.status(404).json({message: "Build not found"});
        res.json(foundBuild);
    } catch (error: unknown) {
        return res.status(500).json({message: (error as Error).message})
    }
}

export const createBuild = async(req: Request, res: Response) => {
    const {name,address} = req.body;
try {
    const newBuild =  await Build.create({name,address})
    res.json(newBuild);
    
} catch (error: unknown) {
    return res.status(500).json({message: (error as Error).message})
}
}

export const updateBuild = async(req: Request, res: Response) => {
    try {
    const {name,
        address
        } = req.body;
    const {id} = req.params;
    const foundBuild =  await Build.findByPk(id) as Model<Build> | null;
    if(!foundBuild)return res.status(404).json({message: "Build not found"});
    (foundBuild as unknown as Build).name = name;
    (foundBuild as unknown as Build).address = address;
    foundBuild.save();
    res.json(foundBuild);
} catch (error: unknown) {
    return res.status(500).json({message: (error as Error).message})
}
}

export const deleteBuild = async(req: Request, res: Response) => {
    try {
    const {id} = req.params;
    await Build.destroy({where: {id}})
    res.sendStatus(204);
} catch (error: unknown) {
    return res.status(500).json({message: (error as Error).message})
}
}
