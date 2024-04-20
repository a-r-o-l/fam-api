import { Request, Response } from "express";
import { Building } from "../../models/Building";
import { Model, Optional } from "sequelize";

type BuildingAttributes = {
  id: number;
  address: string;
  name: string;
  apartments: number;
};

interface BuildingCreationAttributes
  extends Optional<BuildingAttributes, "id"> {}

export interface BuildingType
  extends Model<BuildingAttributes, BuildingCreationAttributes> {
  createdAt?: Date;
  updatedAt?: Date;
}

export const updateBuilding = async (req: Request, res: Response) => {
  try {
    const { name, address } = req.body;
    const { id } = req.params;
    const foundBuilding = (await Building.findByPk(
      id
    )) as Model<BuildingAttributes> | null;
    if (!foundBuilding)
      return res.status(404).json({ message: "Build not found" });
    (foundBuilding as unknown as BuildingAttributes).name = name;
    (foundBuilding as unknown as BuildingAttributes).address = address;
    foundBuilding.save();
    res.json(foundBuilding);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
