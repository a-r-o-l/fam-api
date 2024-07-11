import { Request, Response } from "express";
import { Payment } from "../../models/Payment";
import { Model } from "sequelize";

type PaymentAttributes = {
  id?: number;
  value?: number;
  date?: string;
  payed?: boolean;
  receipt?: string;
  contract_id?: number;
};

export const updatePayment = async (req: Request, res: Response) => {
  try {
    const { value, date, receipt, payed } = req.body;
    const { id } = req.params;
    const foundPayment = (await Payment.findByPk(
      id
    )) as Model<PaymentAttributes> | null;
    if (!foundPayment) {
      return res.status(404).json({ message: "Build not found" });
    }

    const updateData = {
      ...(value !== undefined && { value }),
      ...(date !== undefined && { date }),
      ...(payed !== undefined && { payed }),
      ...(receipt !== undefined && { receipt }),
    };

    await foundPayment.update(updateData);

    res.json(foundPayment);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
