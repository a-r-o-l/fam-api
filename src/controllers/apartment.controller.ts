import { Request, Response } from "express";
import { Apartment } from "../models/Apartment";
import { Building } from "../models/Building";
import { Contract } from "../models/Contract";
import { Renter } from "../models/Renter";
import { CustomRequest } from "../utils/reqResTypes";

export const getApartments = async (req: CustomRequest, res: Response) => {
  try {
    if (!req?.user?.id) {
      throw new Error("User ID is not defined");
    }
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
  if (!req?.user?.id) {
    throw new Error("User ID is not defined");
  }
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

export const createApartment = async (req: CustomRequest, res: Response) => {
  if (!req?.user?.id) {
    throw new Error("User ID is not defined");
  }
  const accountId = req.user.id;
  const { number, building_id, floor } = req.body;
  try {
    const apartmentExists = await Apartment.findOne({
      where: { number, building_id, account_id: accountId, floor },
    });

    if (apartmentExists) {
      return res.status(400).json({ message: "El departamento ya existe" });
    }
    const newApartment = await Apartment.create({
      number,
      building_id,
      floor,
      account_id: accountId,
    });

    res.json(newApartment);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const updateApartment = async (req: Request, res: Response) => {
  try {
    const {
      number,
      rented,
      active_renter_id,
      active_contract_id,
      it_was_sold,
    } = req.body;
    const { id } = req.params;
    const [updatedRows] = await Apartment.update(
      { number, rented, active_renter_id, active_contract_id, it_was_sold },
      { where: { id } }
    );
    if (updatedRows === 0) {
      return res.status(404).json({ message: "Apartment not found" });
    }
    const updatedApartment = await Apartment.findByPk(id);
    res.json(updatedApartment);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteApartment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Apartment.destroy({ where: { id } });
    res.sendStatus(204);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
