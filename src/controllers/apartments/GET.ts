import { Request, Response } from "express";
import { Apartment } from "../../models/Apartment";
import { Building } from "../../models/Building";
import { Contract } from "../../models/Contract";
import { Renter } from "../../models/Renter";
import { Sequelize } from "sequelize";

interface CustomRequest extends Request {
  user?: any;
}

export const getApartments = async (req: CustomRequest, res: Response) => {
  try {
    const accountId = req.user.id;
    const { buildingId } = req.query;
    const where = buildingId
      ? { building_id: buildingId, account_id: accountId }
      : { account_id: accountId };

    const apartments = await Apartment.findAll({
      where: where,
      order: [["id", "ASC"]],
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

export const getApartment = async (req: CustomRequest, res: Response) => {
  const accountId = req.user.id;
  try {
    const { id } = req.params;
    const foundApartment = await Apartment.findOne({
      where: { id, account_id: accountId },
    });
    console.log(foundApartment);
    if (!foundApartment)
      return res.status(404).json({ message: "Apartment not found" });
    res.json(foundApartment);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
