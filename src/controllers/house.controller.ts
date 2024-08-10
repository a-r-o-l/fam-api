import { Request, Response } from "express";
import { House } from "../models/House";
import { HouseAttributes } from "../utils/houseTypes";
import { CustomRequest } from "../utils/reqResTypes";

export const createHouse = async (req: CustomRequest, res: Response) => {
  const { name, address, image_url } = req.body;
  if (!req?.user?.id) {
    throw new Error("User ID is not defined");
  }
  const accountId = req.user.id;
  try {
    const newHouse: HouseAttributes = await House.create({
      name,
      address,
      image_url,
      account_id: accountId,
    });

    res.json(newHouse);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const getHouses = async (req: CustomRequest, res: Response) => {
  try {
    if (!req?.user?.id) {
      throw new Error("User ID is not defined");
    }
    const accountId = req.user.id;

    const houses = await House.findAll({
      where: { account_id: accountId },
      order: [["id", "ASC"]],
    });
    res.json(houses);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const getHouse = async (req: CustomRequest, res: Response) => {
  if (!req?.user?.id) {
    throw new Error("El id del usuario es indefinido");
  }
  const accountId = req.user.id;
  try {
    const { id } = req.params;
    const foundHouse = await House.findOne({
      where: { id, account_id: accountId },
    });
    if (!foundHouse)
      return res.status(404).json({ message: "La casa no existe" });
    res.json(foundHouse);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const updateHouse = async (req: Request, res: Response) => {
  try {
    const {
      address,
      name,
      image_url,
      hidden,
      rented,
      active_contract_id,
      active_renter_id,
      it_was_sold,
    } = req.body;
    const { id } = req.params;
    const foundHouse = await House.findByPk(id);
    if (!foundHouse) {
      return res.status(404).json({ message: "La casa no existe" });
    }

    const updateData = {
      ...(address !== undefined && { address }),
      ...(name !== undefined && { name }),
      ...(image_url !== undefined && { image_url }),
      ...(hidden !== undefined && { hidden }),
      ...(rented !== undefined && { rented }),
      ...(active_contract_id !== undefined && { active_contract_id }),
      ...(active_renter_id !== undefined && { active_renter_id }),
      ...(it_was_sold !== undefined && { it_was_sold }),
    };

    await foundHouse.update(updateData);
    res.json(foundHouse);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteHouse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await House.destroy({ where: { id } });
    res.sendStatus(204);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
