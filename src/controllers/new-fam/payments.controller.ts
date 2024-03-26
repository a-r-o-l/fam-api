import { Request, Response } from "express";
import { Payment } from "../../models/new-fam/Payment";
import { Renter } from "../../models/new-fam/Renter";
import { Model } from "sequelize";
import dayjs from "dayjs";
import nodemailer from "nodemailer";

//user: e3n3o6ctjupop27h@ethereal.email
//password: Rp3fcHx24cBMHdtTmH
type Payment = {
  renterId?: string;
  date?: string;
  paid?: boolean;
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
  const { renterId, date } = req.body;
  try {
    const newPayment = await Payment.create({ renterId, date });
    res.json(newPayment);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const createAutomaticPayment = async () => {
  console.log("se disparo");
  // try {
  // const renters = await Renter.findAll();
  // if (renters?.length) {
  //   renters.forEach(async (renter: any) => {
  //     const newPayment = await Payment.create({
  //       renterId: renter.id,
  //       date: dayjs(renter.start_date).format("DD-MM-YY"),
  //     });
  //   });
  // }
  //   const info = await transporter.sendMail({
  //     from: "alonsoaroldev@gmail.com",
  //     to: "alonsoaroldev@gmail.com",
  //     subject: "news automatic payments created",
  //     text: "5 payments created in the database",
  //   });

  //   console.log(info);
  //   const previewUrl = nodemailer.getTestMessageUrl(info);
  //   console.log(previewUrl);
  // } catch (error: unknown) {
  //   console.log(error);
  // }
};

export const updatePayment = async (req: Request, res: Response) => {
  try {
    const { renterId, paid, date } = req.body;
    const { id } = req.params;
    const foundPayment = (await Payment.findByPk(id)) as Model<Payment> | null;
    if (!foundPayment)
      return res.status(404).json({ message: "Build not found" });
    (foundPayment as unknown as Payment).renterId = renterId;
    (foundPayment as unknown as Payment).date = date;
    (foundPayment as unknown as Payment).paid = paid;
    foundPayment.save();
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
