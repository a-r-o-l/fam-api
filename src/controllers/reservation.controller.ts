import { Request, Response } from "express";
import { Reservation } from "../models/Reservation";
import { CustomRequest } from "../utils/reqResTypes";

export const getReservations = async (req: CustomRequest, res: Response) => {
  try {
    if (!req?.user?.id) {
      throw new Error("User ID is not defined");
    }
    const accountId = req.user.id;
    const { buildingId } = req.query;
    const where = buildingId
      ? { building_id: buildingId, account_id: accountId }
      : { account_id: accountId };

    const reservations = await Reservation.findAll({
      where: where,
      order: [["id", "ASC"]],
    });
    res.json(reservations);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const getReservation = async (req: CustomRequest, res: Response) => {
  if (!req?.user?.id) {
    throw new Error("User ID is not defined");
  }
  const accountId = req.user.id;
  try {
    const { id } = req.params;
    const foundReservation = await Reservation.findOne({
      where: { id, account_id: accountId },
    });
    if (!foundReservation)
      return res.status(404).json({ message: "La reserva no existe" });
    res.json(foundReservation);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const createReservation = async (req: CustomRequest, res: Response) => {
  if (!req?.user?.id) {
    throw new Error("User ID is not defined");
  }
  const accountId = req.user.id;
  const { start_date, end_date, lounge_id, payed, renter, value } = req.body;
  try {
    const reservationExists = await Reservation.findOne({
      where: {
        lounge_id,
        start_date,
        end_date,

        account_id: accountId,
      },
    });

    if (reservationExists) {
      return res.status(400).json({ message: "El salon ya existe" });
    }
    const newReservation = await Reservation.create({
      start_date,
      end_date,
      lounge_id,
      payed,
      renter,
      value,
      account_id: accountId,
    });

    res.json(newReservation);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const updateReservation = async (req: Request, res: Response) => {
  try {
    const { hidden, start_date, end_date, payed, renter, value } = req.body;
    const { id } = req.params;
    const foundReservation = await Reservation.findByPk(id);
    if (!foundReservation) {
      return res.status(404).json({ message: "El salon no existe" });
    }

    const updateData = {
      ...(start_date !== undefined && { start_date }),
      ...(end_date !== undefined && { end_date }),
      ...(payed !== undefined && { payed }),
      ...(hidden !== undefined && { hidden }),
      ...(value !== undefined && { value }),
      ...(renter !== undefined && { renter }),
    };

    await foundReservation.update(updateData);
    res.json(foundReservation);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteReservation = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Reservation.destroy({ where: { id } });
    res.sendStatus(204);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
