import { Request, Response } from "express";
import { Building } from "../../models/new-fam/Building";
import { Model } from "sequelize";

type Building = {
  address: string;
  name: string;
};

export const getBuildings = async (req: Request, res: Response) => {
  try {
    const buildings = await Building.findAll();
    res.json(buildings);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const getBuilding = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const foundBuilding = await Building.findOne({ where: { id } });
    if (!foundBuilding)
      return res.status(404).json({ message: "Building not found" });
    res.json(foundBuilding);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const createBuilding = async (req: Request, res: Response) => {
  const { name, address } = req.body;
  try {
    const newBuilding = await Building.create({ name, address });
    res.json(newBuilding);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const updateBuilding = async (req: Request, res: Response) => {
  try {
    const { name, address } = req.body;
    const { id } = req.params;
    const foundBuilding = (await Building.findByPk(
      id
    )) as Model<Building> | null;
    if (!foundBuilding)
      return res.status(404).json({ message: "Build not found" });
    (foundBuilding as unknown as Building).name = name;
    (foundBuilding as unknown as Building).address = address;
    foundBuilding.save();
    res.json(foundBuilding);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteBuilding = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Building.destroy({ where: { id } });
    res.sendStatus(204);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
