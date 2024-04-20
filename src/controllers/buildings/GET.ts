import { Request, Response } from "express";
import { Building } from "../../models/Building";
import { Apartment } from "../../models/Apartment";
import { Model, Optional } from "sequelize";
import { Renter } from "../../models/Renter";
import { Contract } from "../../models/Contract";

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

export const getBuildings = async (req: Request, res: Response) => {
  try {
    const buildings = await Building.findAll({
      order: [["name", "ASC"]],
      include: [
        {
          model: Apartment,
          as: "Apartments",
          include: [
            {
              model: Contract,
              as: "Contracts",
              include: [
                {
                  model: Renter,
                  as: "Renter",
                },
              ],
            },
          ],
        },
      ],
    });
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
