import { Request, Response } from "express";
import { Apartment } from "../models/Apartment";
import { Contract } from "../models/Contract";
import { Payment } from "../models/Payment";

interface CustomRequest extends Request {
  user?: any;
}

export const getPayments = async (req: CustomRequest, res: Response) => {
  const accountId = req.user.id;

  try {
    const foundPayments = await Payment.findAll({
      where: { account_id: accountId },
    });
    res.json(foundPayments);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const getPayment = async (req: CustomRequest, res: Response) => {
  const accountId = req.user.id;
  try {
    const { id } = req.params;
    const foundPayment = await Payment.findOne({
      where: { id, account_id: accountId },
    });
    if (!foundPayment)
      return res.status(404).json({ message: "Building not found" });
    res.json(foundPayment);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const createPayment = async (req: CustomRequest, res: Response) => {
  const {
    value,
    date,
    payed,
    receipt,
    contract_id,
    property_id,
    payment_number,
  } = req.body;
  const accountId = req.user.id;
  try {
    const newProperty = await Payment.create({
      value,
      date,
      payed,
      receipt,
      contract_id,
      property_id,
      payment_number,
      account_id: accountId,
    });
    res.json(newProperty);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const updatePayment = async (req: CustomRequest, res: Response) => {
  try {
    const {
      value,
      date,
      payed,
      receipt,
      contract_id,
      property_id,
      payment_number,
    } = req.body;
    const { id } = req.params;

    const foundPayment = await Payment.findByPk(id);
    if (!foundPayment) {
      return res.status(404).json({ message: "La propiedad no existe" });
    }

    await foundPayment.update({
      value,
      date,
      payed,
      receipt,
      contract_id,
      property_id,
      payment_number,
    });

    res.json(foundPayment);
  } catch (error) {
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
