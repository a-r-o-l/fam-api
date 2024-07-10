import { Request, Response } from "express";
import { Renter } from "../../models/Renter";

interface CustomRequest extends Request {
  user?: any;
}

export const createRenter = async (req: CustomRequest, res: Response) => {
  const accountId = req.user.id;
  const { name, lastname, email, dni, phone, image_url } = req.body;
  try {
    const newRenter = await Renter.create({
      name,
      lastname,
      dni,
      phone,
      email,
      image_url,
      account_id: accountId,
    });
    res.json(newRenter);
  } catch (error: unknown) {
    console.log(error);
    return res.status(500).json({ message: (error as Error).message });
  }
};
