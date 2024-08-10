import { Request, Response } from "express";
import { Renter } from "../../models/Renter";
import { Contract } from "../../models/Contract";
import { Apartment } from "../../models/Apartment";
import { Building } from "../../models/Building";
import { Op, col } from "sequelize";
import { CustomRequest } from "../../utils/reqResTypes";

export const getRenters = async (req: CustomRequest, res: Response) => {
  if (!req?.user?.id) {
    throw new Error("User ID is not defined");
  }
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
  if (!req?.user?.id) {
    throw new Error("User ID is not defined");
  }
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
    if (!req?.user?.id) {
      throw new Error("User ID is not defined");
    }
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

export const createRenter = async (req: CustomRequest, res: Response) => {
  if (!req?.user?.id) {
    throw new Error("User ID is not defined");
  }
  const accountId = req.user.id;
  const { name, lastname, email, dni, phone, image_url } = req.body;
  try {
    const newRenter = await Renter.create({
      name,
      lastname,
      dni,
      phone,
      email,
      image_url,
      account_id: accountId,
    });
    res.json(newRenter);
  } catch (error: unknown) {
    console.log(error);
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const updateRenter = async (req: Request, res: Response) => {
  try {
    const {
      name,
      lastname,
      dni,
      phone,
      image_url,
      email,
      active_apartment_id,
      active_contract_id,
    } = req.body;
    const { id } = req.params;

    const foundRenter = await Renter.findByPk(id);
    if (!foundRenter) {
      return res.status(404).json({ message: "Renter not found" });
    }

    const updateData = {
      ...(name !== undefined && { name }),
      ...(lastname !== undefined && { lastname }),
      ...(dni !== undefined && { dni }),
      ...(phone !== undefined && { phone }),
      ...(image_url !== undefined && { image_url }),
      ...(email !== undefined && { email }),
      ...(active_apartment_id !== undefined && { active_apartment_id }),
      ...(active_contract_id !== undefined && { active_contract_id }),
    };

    await foundRenter.update(updateData);

    res.json(foundRenter);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteRenter = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const contracts = await Contract.findAll({ where: { renter_id: id } });
    if (contracts.length > 0) {
      return res
        .status(410)
        .json({ message: "Cannot delete renter with contracts" });
    }
    await Renter.destroy({ where: { id } });
    res.sendStatus(204);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
