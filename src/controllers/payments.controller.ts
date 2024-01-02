import { Request, Response } from "express";
import { Model } from "sequelize";
import { Payment } from "../models/Payment";

type PaymentProps = {
  id?: BigInteger;
  date?: Date;
  value?: BigInteger;
  wasPaid?: boolean;
  apartmentId?: BigInteger;
  renterId?: BigInteger;
};

export const getPayments = async (req: Request, res: Response) => {
  try {
    const payments = await Payment.findAll();
    res.json(payments);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const getPayment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const foundPayment = await Payment.findOne({ where: { id } });
    if (!foundPayment)
      return res.status(404).json({ message: "Payment not found" });
    res.json(foundPayment);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const createPayment = async (req: Request, res: Response) => {
  const { date, value, wasPaid, apartmentId, renterId } = req.body;
  try {
    const newPayment = await Payment.create({});
    res.json(newPayment);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const updatePayment = async (req: Request, res: Response) => {
  try {
    const { date, value, wasPaid, apartmentId, renterId } = req.body;
    const { id } = req.params;
    const foundPayment = (await Payment.findByPk(id)) as Model & PaymentProps;
    if (!foundPayment)
      return res.status(404).json({ message: "Renter not found" });
    foundPayment.date = date;
    foundPayment.value = value;
    foundPayment.wasPaid = wasPaid;
    foundPayment.apartmentId = apartmentId;
    foundPayment.renterId = renterId;
    await foundPayment.save();
    res.json(foundPayment);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const deletePayment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Payment.destroy({ where: { id } });
    res.sendStatus(204);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
