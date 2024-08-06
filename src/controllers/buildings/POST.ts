import { Request, Response } from "express";
import { Building } from "../../models/Building";
import { Apartment } from "../../models/Apartment";
import { Model, Optional } from "sequelize";

type BuildingAttributes = {
  id: number;
  address: string;
  name: string;
  apartments: number;
  apartments_with_floor?: boolean;
  image_url?: string;
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

export const createBuilding = async (req: CustomRequest, res: Response) => {
  const { name, address, apartments, apartments_with_floor, image_url } =
    req.body;
  const accountId = req.user.id;
  try {
    const newBuilding: BuildingType = await Building.create({
      name,
      address,
      apartments,
      apartments_with_floor,
      image_url,
      account_id: accountId,
    });
    if (!apartments_with_floor) {
      for (let i = 1; i <= apartments; i++) {
        await Apartment.create({
          number: `${i}`,
          building_id: newBuilding.getDataValue("id"),
          account_id: accountId,
        });
      }
    }
    res.json(newBuilding);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
