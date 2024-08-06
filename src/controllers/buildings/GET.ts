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

interface CustomRequest extends Request {
  user?: any;
}

export const getBuildings = async (req: CustomRequest, res: Response) => {
  const accountId = req.user.id;
  try {
    const buildings = await Building.findAll({
      where: { account_id: accountId },
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

export const getBuilding = async (req: CustomRequest, res: Response) => {
  const accountId = req.user.id;
  try {
    const { id } = req.params;
    const foundBuilding = await Building.findOne({
      where: { id, account_id: accountId },
    });
    if (!foundBuilding) {
      return res.status(404).json({ message: "Building not found" });
    }
    res.json(foundBuilding);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
