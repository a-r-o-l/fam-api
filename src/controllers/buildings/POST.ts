import { Request, Response } from "express";
import { Building } from "../../models/Building";
import { Apartment } from "../../models/Apartment";
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

export const createBuilding = async (req: Request, res: Response) => {
  const { name, address, apartments } = req.body;
  try {
    const newBuilding: BuildingType = await Building.create({
      name,
      address,
      apartments,
    });
    for (let i = 1; i <= apartments; i++) {
      await Apartment.create({
        number: `${i}`,
        buildingId: newBuilding.getDataValue("id"),
      });
    }
    res.json(newBuilding);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
