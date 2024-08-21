import { Request, Response } from "express";
import { Reservation } from "../models/Reservation";
import { CustomRequest } from "../utils/reqResTypes";
import { Op } from "sequelize";

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
  const { start_date, end_date, lounge_id, payed, renter, value, booking } =
    req.body;
  try {
    const overlappingReservation = await Reservation.findOne({
      where: {
        lounge_id,
        account_id: accountId,
        [Op.or]: [
          {
            start_date: {
              [Op.between]: [start_date, end_date],
            },
          },
          {
            end_date: {
              [Op.between]: [start_date, end_date],
            },
          },
          {
            [Op.and]: [
              {
                start_date: {
                  [Op.lte]: start_date,
                },
              },
              {
                end_date: {
                  [Op.gte]: end_date,
                },
              },
            ],
          },
        ],
      },
    });

    if (overlappingReservation) {
      return res.status(415).json({
        message:
          "El salón ya está reservado en el rango de fechas y horas proporcionadas.",
      });
    }
    const newReservation = await Reservation.create({
      start_date,
      end_date,
      lounge_id,
      payed,
      renter,
      value,
      booking,
      account_id: accountId,
    });

    res.json(newReservation);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const updateReservation = async (req: Request, res: Response) => {
  try {
    const { hidden, start_date, end_date, payed, renter, value, booking } =
      req.body;
    console.log(req.body);
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
      ...(booking !== undefined && { booking }),
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
