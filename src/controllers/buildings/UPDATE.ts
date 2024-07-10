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

interface ApartmentAttributes {
  number: number;
  building_id: number;
  rented: boolean;
  destroy: () => void;
}

interface BuildingCreationAttributes
  extends Optional<BuildingAttributes, "id"> {}

export interface BuildingType
  extends Model<BuildingAttributes, BuildingCreationAttributes> {
  createdAt?: Date;
  updatedAt?: Date;
}

export const updateBuilding = async (req: Request, res: Response) => {
  try {
    const { name, address, apartments } = req.body;
    const { id } = req.params;

    const foundBuilding = await Building.findByPk(id);
    if (!foundBuilding)
      return res.status(404).json({ message: "Building not found" });

    await foundBuilding.update({ name, address, apartments });

    const currentApartments = await Apartment.findAll({
      where: { building_id: id },
    });

    if (apartments !== currentApartments.length && apartments > 0) {
      const maxI =
        apartments > currentApartments.length
          ? apartments
          : currentApartments.length;

      for (let i = 1; i <= maxI; i++) {
        const exist = currentApartments.find(
          (a) => a.get("number") === i.toString()
        ) as ApartmentAttributes | undefined;
        if (exist) {
          if (i <= apartments) {
            continue;
          } else {
            if (exist.rented) {
              console.log("is rented");
              return res
                .status(410)
                .json({ message: "Cannot delete rented apartment" });
            }
            exist.destroy();
          }
        } else {
          await Apartment.create({
            number: `${i}`,
            building_id: foundBuilding.getDataValue("id"),
          });
        }
      }
    }

    res.json(foundBuilding);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
