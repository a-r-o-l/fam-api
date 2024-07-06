import { Request, Response } from "express";
import { Upgrade } from "../../models/Upgrades";
import { Op, where } from "sequelize";
import dayjs from "dayjs";

export const createUpgrade = async (req: Request, res: Response) => {
  const { contractId, startDate, endDate, newValue, isExpired } = req.body;

  try {
    const newUpgrade = await Upgrade.create({
      contractId,
      startDate,
      endDate,
      newValue,
      isExpired,
    });
    res.json(newUpgrade);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const updateUpgrade = async (req: Request, res: Response) => {
  try {
    const { contractId, startDate, endDate, newValue, isExpired } = req.body;

    const { id } = req.params;

    const updatedUpgrade = await Upgrade.update(
      {
        contractId,
        startDate,
        endDate,
        newValue,
        isExpired,
      },
      {
        where: { id },
        returning: true, // Para bases de datos que lo soporten, retorna el objeto actualizado.
      }
    );

    res.json(updatedUpgrade);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteUpgrade = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await Upgrade.destroy({
      where: { id },
    });

    if (deleted) {
      res.json({ message: "Upgrade deleted successfully." });
    } else {
      res.status(404).json({ message: "Upgrade not found." });
    }
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
