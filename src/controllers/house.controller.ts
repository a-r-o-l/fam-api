import { Response } from "express";
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
