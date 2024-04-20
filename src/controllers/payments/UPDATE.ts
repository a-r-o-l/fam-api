import { Request, Response } from "express";
import { Payment } from "../../models/Payment";
import { Model } from "sequelize";

type PaymentAttributes = {
  id?: number;
  value?: number;
  date?: string;
  payed?: boolean;
  receipt?: string;
  contractId?: number;
};

export const updatePayment = async (req: Request, res: Response) => {
  try {
    const { contractId, value, date, receipt, payed } = req.body;
    const { id } = req.params;
    const foundPayment = (await Payment.findByPk(
      id
    )) as Model<PaymentAttributes> | null;
    if (!foundPayment)
      return res.status(404).json({ message: "Build not found" });
    if (contractId !== undefined)
      (foundPayment as unknown as PaymentAttributes).contractId = contractId;
    if (date !== undefined)
      (foundPayment as unknown as PaymentAttributes).date = date;
    if (value !== undefined)
      (foundPayment as unknown as PaymentAttributes).value = value;
    if (receipt !== undefined)
      (foundPayment as unknown as PaymentAttributes).receipt = receipt;
    if (payed !== undefined)
      (foundPayment as unknown as PaymentAttributes).payed = payed;
    foundPayment.save();
    res.json(foundPayment);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
