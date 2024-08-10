import { Request, Response } from "express";
import { Apt } from "../models/Apt";
import { Contract } from "../models/Contract";
import { Renter } from "../models/Renter";
import { CustomRequest } from "../utils/reqResTypes";

export const getApts = async (req: CustomRequest, res: Response) => {
  try {
    if (!req?.user?.id) {
      throw new Error("User ID is not defined");
    }
    const accountId = req.user.id;
    const { buildingId } = req.query;
    const where = buildingId
      ? { building_id: buildingId, account_id: accountId }
      : { account_id: accountId };

    const apartments = await Apt.findAll({
      where: where,
      order: [["id", "ASC"]],
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
    });
    res.json(apartments);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const getApt = async (req: CustomRequest, res: Response) => {
  if (!req?.user?.id) {
    throw new Error("User ID is not defined");
  }
  const accountId = req.user.id;
  try {
    const { id } = req.params;
    const foundApartment = await Apt.findOne({
      where: { id, account_id: accountId },
    });
    if (!foundApartment)
      return res.status(404).json({ message: "Apt not found" });
    res.json(foundApartment);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const createApt = async (req: CustomRequest, res: Response) => {
  if (!req?.user?.id) {
    throw new Error("User ID is not defined");
  }
  const accountId = req.user.id;
  const { number, floor, building_name } = req.body;
  try {
    const apartmentExists = await Apt.findOne({
      where: { number, building_name, account_id: accountId, floor },
    });

    if (apartmentExists) {
      return res.status(400).json({ message: "El departamento ya existe" });
    }
    const newApartment = await Apt.create({
      number,
      building_name,
      floor,
      account_id: accountId,
    });

    res.json(newApartment);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const updateApt = async (req: Request, res: Response) => {
  try {
    const {
      number,
      floor,
      building_name,
      active_renter_id,
      active_contract_id,
      it_was_sold,
      hidden,
    } = req.body;
    const { id } = req.params;
    const [updatedRows] = await Apt.update(
      {
        number,
        building_name,
        active_renter_id,
        active_contract_id,
        it_was_sold,
        floor,
        hidden,
      },
      { where: { id } }
    );
    if (updatedRows === 0) {
      return res.status(404).json({ message: "Apt not found" });
    }
    const updatedApartment = await Apt.findByPk(id);
    res.json(updatedApartment);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteApt = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Apt.destroy({ where: { id } });
    res.sendStatus(204);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
