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
  buildingId: number;
  rented: boolean;
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
    const foundBuilding = (await Building.findByPk(
      id
    )) as Model<BuildingAttributes> | null;
    if (!foundBuilding)
      return res.status(404).json({ message: "Build not found" });
    (foundBuilding as unknown as BuildingAttributes).name = name;
    (foundBuilding as unknown as BuildingAttributes).address = address;
    (foundBuilding as unknown as BuildingAttributes).apartments = apartments;
    foundBuilding.save();

    const currentApartments = await Apartment.findAll({
      where: {
        buildingId: req.params.id,
      },
    });

    console.log(currentApartments);
    if (apartments !== currentApartments.length && apartments > 0) {
      const maxI =
        apartments > currentApartments.length
          ? apartments
          : currentApartments.length;

      for (let i = 1; i <= maxI; i++) {
        const exist: any = currentApartments.find((a) => {
          const numb = a.get("number");
          return numb === i.toString();
        });
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
            await exist.destroy();
          }
        } else {
          await Apartment.create({
            number: `${i}`,
            buildingId: foundBuilding.getDataValue("id"),
          });
        }
      }
    }

    res.json(foundBuilding);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
