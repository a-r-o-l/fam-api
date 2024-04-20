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

export const deleteBuilding = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Building.destroy({ where: { id } });
    res.sendStatus(204);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
