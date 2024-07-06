import { Request, Response } from "express";
import { Upgrade } from "../../models/Upgrades";

export const getAllUpgrades = async (req: Request, res: Response) => {
  try {
    const upgrades = await Upgrade.findAll();
    res.json(upgrades);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const getUpgradeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const upgrade = await Upgrade.findByPk(id);

    if (upgrade) {
      res.json(upgrade);
    } else {
      res.status(404).json({ message: "Upgrade not found." });
    }
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
