import { Request, Response } from "express";
import { Lounge } from "../models/Lounge";
import { CustomRequest } from "../utils/reqResTypes";
import { Reservation } from "../models/Reservation";

export const getLounges = async (req: CustomRequest, res: Response) => {
  try {
    if (!req?.user?.id) {
      throw new Error("User ID is not defined");
    }
    const accountId = req.user.id;
    const { buildingId } = req.query;
    const where = buildingId
      ? { building_id: buildingId, account_id: accountId }
      : { account_id: accountId };

    const lounges = await Lounge.findAll({
      where: where,
      order: [["id", "ASC"]],
      include: [
        {
          model: Reservation,
          as: "Reservations",
          order: [["start_date", "ASC"]],
        },
      ],
    });
    res.json(lounges);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const getLounge = async (req: CustomRequest, res: Response) => {
  if (!req?.user?.id) {
    throw new Error("User ID is not defined");
  }
  const accountId = req.user.id;
  try {
    const { id } = req.params;
    const foundLounge = await Lounge.findOne({
      where: { id, account_id: accountId },
      include: [
        {
          model: Reservation,
          as: "Reservations",
          separate: true,
          order: [["start_date", "ASC"]],
        },
      ],
    });
    if (!foundLounge)
      return res.status(404).json({ message: "Lounge not found" });
    res.json(foundLounge);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const createLounge = async (req: CustomRequest, res: Response) => {
  if (!req?.user?.id) {
    throw new Error("User ID is not defined");
  }
  const accountId = req.user.id;
  const { address, name, image_url } = req.body;
  try {
    const loungeExists = await Lounge.findOne({
      where: { name, address, account_id: accountId },
    });

    if (loungeExists) {
      return res.status(400).json({ message: "El salon ya existe" });
    }
    const newLounge = await Lounge.create({
      address,
      name,
      image_url,
      account_id: accountId,
    });

    res.json(newLounge);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const updateLounge = async (req: Request, res: Response) => {
  try {
    const { address, name, image_url, hidden, reservation_id, it_was_sold } =
      req.body;
    const { id } = req.params;
    const foundLounge = await Lounge.findByPk(id);
    if (!foundLounge) {
      return res.status(404).json({ message: "El salon no existe" });
    }

    const updateData = {
      ...(address !== undefined && { address }),
      ...(name !== undefined && { name }),
      ...(image_url !== undefined && { image_url }),
      ...(hidden !== undefined && { hidden }),
      ...(reservation_id !== undefined && { reservation_id }),
      ...(it_was_sold !== undefined && { it_was_sold }),
    };

    await foundLounge.update(updateData);
    res.json(foundLounge);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteLounge = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Lounge.destroy({ where: { id } });
    res.sendStatus(204);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
