import { Request, Response } from "express";
import { Renter } from "../../models/Renter";
import { Contract } from "../../models/Contract";
import { Apartment } from "../../models/Apartment";
import { Building } from "../../models/Building";
import { Op, col } from "sequelize";

type Renter = {
  name: string;
  lastname: string;
  dni: string;
  phone: string;
  apartment?: string;
  building_id?: number;
  fee?: string;
  image_url?: string;
  start_date: string;
  contract?: number;
  amount?: number;
  end_date?: string;
  email?: string;
};

interface CustomRequest extends Request {
  user?: any;
}

export const getRenters = async (req: CustomRequest, res: Response) => {
  const accountId = req.user.id;
  try {
    if (!!req.query?.buildingId) {
      if (typeof req.query.buildingId === "string") {
        const buildingIds = req.query.buildingId.split(",").map(Number);
        const numberIds = buildingIds.map((id) => Number(id));
        const rentersByBuilding = await Renter.findAll({
          where: {
            Apartment: {
              building_id: {
                [Op.in]: numberIds,
              },
            },
            account_id: accountId,
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
          order: [
            [col("Contracts.Apartment.building_id"), "ASC"],
            [col("Contracts.Apartment.number"), "ASC"],
          ],
        });
        res.json(rentersByBuilding);
      }
    } else {
      const renters = await Renter.findAll({
        where: { account_id: accountId },
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
        order: [
          [col("Contracts.Apartment.building_id"), "ASC"],
          [col("Contracts.Apartment.number"), "ASC"],
        ],
      });
      res.json(renters);
    }
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const getRenter = async (req: CustomRequest, res: Response) => {
  const accountId = req.user.id;
  try {
    if (req?.params?.active_contract_id) {
      const { active_contract_id } = req.params;
      const foundRenter = await Renter.findOne({
        where: { active_contract_id, account_id: accountId },
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
      where: { id, account_id: accountId },
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

export const getRenterByContract = async (
  req: CustomRequest,
  res: Response
) => {
  try {
    const accountId = req.user.id;
    const { activeContractId } = req.params;
    const foundRenter = await Renter.findOne({
      where: { active_contract_id: activeContractId, account_id: accountId },
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
