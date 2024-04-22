import { Request, Response } from "express";
import { Renter } from "../../models/Renter";
import { Contract } from "../../models/Contract";
import { Apartment } from "../../models/Apartment";
import { Building } from "../../models/Building";
import { Op } from "sequelize";

type Renter = {
  name: string;
  lastname: string;
  dni: string;
  phone: string;
  apartment?: string;
  buildingId?: number;
  fee?: string;
  image_url?: string;
  start_date: string;
  contract?: number;
  amount?: number;
  end_date?: string;
  email?: string;
};

export const getRenters = async (req: Request, res: Response) => {
  try {
    if (!!req.query?.buildingId) {
      if (typeof req.query.buildingId === "string") {
        const buildingIds = req.query.buildingId.split(",").map(Number);
        const numberIds = buildingIds.map((id) => Number(id));
        const rentersByBuilding = await Renter.findAll({
          where: {
            Apartment: {
              buildingId: {
                [Op.in]: numberIds,
              },
            },
          },
          include: [
            {
              model: Contract,
              as: "Contracts",
              include: [
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
        res.json(rentersByBuilding);
      }
    } else {
      const renters = await Renter.findAll({
        include: [
          {
            model: Contract,
            as: "Contracts",
            include: [
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
      res.json(renters);
    }
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const getRenter = async (req: Request, res: Response) => {
  try {
    if (req?.params?.activeContractId) {
      const { activeContractId } = req.params;
      const foundRenter = await Renter.findOne({
        where: { activeContractId },
        include: [
          {
            model: Contract,
            as: "Contracts",
            include: [
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
      if (!foundRenter)
        return res.status(404).json({ message: "Renter not found" });
      res.json(foundRenter);
    }
    const { id } = req.params;
    const foundRenter = await Renter.findOne({
      where: { id },
      include: [
        {
          model: Contract,
          as: "Contracts",
          include: [
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
    if (!foundRenter)
      return res.status(404).json({ message: "Renter not found" });
    res.json(foundRenter);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const getRenterByContract = async (req: Request, res: Response) => {
  try {
    const { activeContractId } = req.params;
    const foundRenter = await Renter.findOne({
      where: { activeContractId },
      include: [
        {
          model: Contract,
          as: "Contracts",
          include: [
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
    if (!foundRenter) {
      return res.status(404).json({ message: "Renter not found" });
    }
    res.json(foundRenter);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
