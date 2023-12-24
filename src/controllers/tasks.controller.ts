import { Request, Response } from 'express';
import {Task  } from "../models/Task";   
import { Model } from 'sequelize'; // Import the Model type from Sequelize

type Task = {
    name: string,
    done: boolean,
}

export const getTasks = async(req: Request, res: Response) => {
    try {
        const tasks = await Task.findAll();
        console.log(tasks)
        res.json(tasks)
        
    } catch (error: unknown) {
        return res.status(500).json({message: (error as Error).message})
    }
}

export const getTask = async (req: Request, res:Response) => {
    try {
        const {id} = req.params;
        const foundTask = await Task.findOne({where: {id}});
        if(!foundTask) return res.status(404).json({message: "Task not found"});
        res.json(foundTask);
        
    } catch (error: unknown) {
        return res.status(500).json({message: (error as Error).message})
    }
}

export const createTask = async(req: Request, res: Response) => {
    const {name, done} = req.body;
try {
    const newTask =  await Task.create({
        name,
        done
    })
    res.json(newTask);
    
} catch (error: unknown) {
    return res.status(500).json({message: (error as Error).message})
    
}

}

export const updateTask = async(req: Request, res: Response) => {
    try {
    const {name, priority, description} = req.body;
    const {id} = req.params;
    const foundTask =  await Task.findByPk(id) as Model<Task> | null;
    if(!foundTask)return res.status(404).json({message: "Task not found"});
    (foundTask as unknown as Task).name = name;
    (foundTask as unknown as Task).done = description;
    foundTask.save();
    res.json(foundTask);
} catch (error: unknown) {
    return res.status(500).json({message: (error as Error).message})
}
}

export const deleteTask = async(req: Request, res: Response) => {
    try {
    const {id} = req.params;
    await Task.destroy({where: {id}})
    res.sendStatus(204);
    
} catch (error: unknown) {
    return res.status(500).json({message: (error as Error).message})
}
}
