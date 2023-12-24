import { Request, Response } from 'express';
import {Project  } from "../models/Project";   
import { Model } from 'sequelize'; // Import the Model type from Sequelize
import { Task } from '../models/Task';

type Project = {
    name: string,
    priority: string,
    description: string
}

export const getProjects = async(req: Request, res: Response) => {
    try {
        const projects = await Project.findAll();
        console.log(projects)
        res.json(projects)
        
    } catch (error: unknown) {
        return res.status(500).json({message: (error as Error).message})
    }
}

export const getProject = async (req: Request, res:Response) => {
    try {
        const {id} = req.params;
        const project = await Project.findOne({where: {id}});
        if(!project) return res.status(404).json({message: "Project not found"});
        res.json(project);
        
    } catch (error: unknown) {
        return res.status(500).json({message: (error as Error).message})
    }
}

export const createProject = async(req: Request, res: Response) => {
    const {name, priority, description} = req.body;
try {
    const newProject =  await Project.create({
        name,
        priority,
        description
    })
    res.json(newProject);
    
} catch (error: unknown) {
    return res.status(500).json({message: (error as Error).message})
    
}

}

export const updateProject = async(req: Request, res: Response) => {
    try {
    const {name, priority, description} = req.body;
    const {id} = req.params;
    const foundProject =  await Project.findByPk(id) as Model<Project> | null;
    if(!foundProject)return res.status(404).json({message: "Project not found"});
    (foundProject as unknown as Project).name = name;
    (foundProject as unknown as Project).priority = priority;
    (foundProject as unknown as Project).description = description;
    foundProject.save();
    res.json(foundProject);
} catch (error: unknown) {
    return res.status(500).json({message: (error as Error).message})
}
}

export const deleteProject = async(req: Request, res: Response) => {
    try {
    const {id} = req.params;
    await Project.destroy({where: {id}})
    res.sendStatus(204);
    
} catch (error: unknown) {
    return res.status(500).json({message: (error as Error).message})
}
}

export const getProjectTasks = async(req: Request, res: Response) => {
    try {
        const {id} = req.params;
        const tasks = await Task.findAll({where: {id}});
        res.json(tasks);
        
    } catch (error: unknown) {
        return res.status(500).json({message: (error as Error).message})
    }
}