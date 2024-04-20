import { Request, Response } from "express";
import { Apartment } from "../../models/Apartment";
import { Building } from "../../models/Building";
import { Contract } from "../../models/Contract";
import { Renter } from "../../models/Renter";

export const getApartments = async (req: Request, res: Response) => {
  try {
    const { buildingId } = req.query;
    const apartments = await Apartment.findAll({
      where: buildingId ? { buildingId } : undefined,
      order: [["number", "ASC"]],
      include: [
        {
          model: Building,
          as: "Building",
        },
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
    });
    res.json(apartments);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const getApartment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const foundApartment = await Apartment.findOne({ where: { id } });
    if (!foundApartment)
      return res.status(404).json({ message: "Apartment not found" });
    res.json(foundApartment);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
