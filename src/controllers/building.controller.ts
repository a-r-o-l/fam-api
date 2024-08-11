import { Request, Response } from "express";
import { Building } from "../models/Building";
import { Apartment } from "../models/Apartment";
import { Renter } from "../models/Renter";
import { Contract } from "../models/Contract";
import { CustomRequest } from "../utils/reqResTypes";
import { ApartmentAttributes } from "../utils/apartmentTypes";
import { BuildingAttributes } from "../utils/buildingTypes";

export const getBuildings = async (req: CustomRequest, res: Response) => {
  if (!req?.user?.id) {
    throw new Error("User ID is not defined");
  }
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
  if (!req?.user?.id) {
    throw new Error("User ID is not defined");
  }
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

export const createBuilding = async (req: CustomRequest, res: Response) => {
  const { name, address, apartments, apartments_with_floor, image_url } =
    req.body;
  if (!req?.user?.id) {
    throw new Error("User ID is not defined");
  }
  const accountId = req.user.id;
  try {
    const newBuilding: BuildingAttributes = await Building.create({
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

export const updateBuilding = async (req: CustomRequest, res: Response) => {
  try {
    const { name, address, apartments, image_url } = req.body;
    if (!req?.user?.id) {
      throw new Error("User ID is not defined");
    }
    const { id } = req.params;
    const accountId = req.user.id;

    const foundBuilding = await Building.findByPk(id);
    if (!foundBuilding)
      return res.status(404).json({ message: "Building not found" });

    await foundBuilding.update({ name, address, apartments, image_url });

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
            account_id: accountId,
          });
        }
      }
    }

    res.json(foundBuilding);
  } catch (error) {
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
