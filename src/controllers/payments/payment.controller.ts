import { Request, Response } from "express";
import { Payment } from "../../models/Payment";
import { Contract } from "../../models/Contract";
import { Renter } from "../../models/Renter";
import { Apartment } from "../../models/Apartment";
import { Building } from "../../models/Building";
import dayjs from "dayjs";
import { Model, Op } from "sequelize";
import { PaymentInterface, PaymentAttributes } from "../../utils/paymentTypes";
import { CustomRequest } from "../../utils/reqResTypes";

export const getPayments = async (req: CustomRequest, res: Response) => {
  if (!req?.user?.id) {
    throw new Error("User ID is not defined");
  }
  const accountId = req.user.id;
  let where = {};
  const { renterId } = req.query;

  if (renterId) {
    where = { renter_id: renterId, account_id: accountId };
  } else {
    where = { account_id: accountId };
  }

  try {
    const payments = await Payment.findAll({
      where,
      order: [
        ["date", "ASC"],
        ["id", "ASC"],
      ],
      include: [
        {
          model: Contract,
          as: "Contract",
          include: [
            {
              model: Renter,
              as: "Renter",
            },
            {
              model: Apartment,
              as: "Apartment",
              include: [
                {
                  model: Building,
                  as: "Building",
                },
              ],
            },
          ],
        },
      ],
    });
    res.json(payments);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const getPayment = async (req: CustomRequest, res: Response) => {
  if (!req?.user?.id) {
    throw new Error("User ID is not defined");
  }
  const accountId = req.user.id;

  try {
    const { id } = req.params;
    const foundPayment = await Payment.findOne({
      where: { id, account_id: accountId },
    });
    if (!foundPayment)
      return res.status(404).json({ message: "Payment not found" });
    res.json(foundPayment);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const createPayment = async (req: CustomRequest, res: Response) => {
  if (!req?.user?.id) {
    throw new Error("User ID is not defined");
  }
  const accountId = req.user.id;

  const { value, date, receipt, contract_id, renter_id, apartment_id, payed } =
    req.body;
  try {
    const firstDayOfMonth = dayjs(date, "YYYY/MM/DD")
      .startOf("month")
      .format("YYYY/MM/DD");
    const lastDayOfMonth = dayjs(date, "YYYY/MM/DD")
      .endOf("month")
      .format("YYYY/MM/DD");
    const existingPayment = await Payment.findOne({
      where: {
        account_id: accountId,
        contract_id,
        date: {
          [Op.gte]: firstDayOfMonth,
          [Op.lte]: lastDayOfMonth,
        },
      },
    });

    if (existingPayment) {
      return res.status(400).json({
        message: "Ya existe un pago de este contrato en el mismo mes.",
      });
    }
    const lastPayment = (await Payment.findOne({
      where: { contract_id, account_id: accountId },
      order: [["payment_number", "DESC"]],
    })) as PaymentAttributes;
    const payment_number = lastPayment?.payment_number
      ? lastPayment.payment_number + 1
      : 1;
    const newPayment = await Payment.create({
      contract_id,
      date,
      receipt,
      value,
      renter_id,
      apartment_id,
      payment_number,
      account_id: accountId,
      payed: payed || false,
    });
    res.json(newPayment);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const updatePayment = async (req: Request, res: Response) => {
  try {
    const { value, date, receipt, payed } = req.body;
    const { id } = req.params;
    const foundPayment = (await Payment.findByPk(
      id
    )) as Model<PaymentInterface> | null;
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

export const deletePayment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Payment.destroy({ where: { id } });
    res.sendStatus(204);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
