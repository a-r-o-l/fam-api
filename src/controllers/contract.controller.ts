import { Request, Response } from "express";
import { Contract } from "../models/Contract";
import { Renter } from "../models/Renter";
import { Apartment } from "../models/Apartment";
import { Op } from "sequelize";
import dayjs from "dayjs";
import { Payment } from "../models/Payment";
import { CustomRequest } from "../utils/reqResTypes";
import { RenterAttributes } from "../utils/renterTypes";
import { ContractAttributes } from "../utils/contractTypes";
import { ApartmentAttributes } from "../utils/apartmentTypes";

export const getContracts = async (req: CustomRequest, res: Response) => {
  if (!req?.user?.id) {
    throw new Error("User ID is not defined");
  }
  const accountId = req.user.id;
  try {
    const contracts = await Contract.findAll({
      where: { account_id: accountId },
      include: [
        {
          model: Renter,
          as: "Renter",
        },
        {
          model: Apartment,
          as: "Apartment",
        },
      ],
    });
    res.json(contracts);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const getContract = async (req: CustomRequest, res: Response) => {
  if (!req?.user?.id) {
    throw new Error("User ID is not defined");
  }
  const accountId = req.user.id;
  try {
    const { id } = req.params;
    const foundContract = await Contract.findOne({
      where: { id, account_id: accountId },
      include: [
        {
          model: Renter,
          as: "Renter",
        },
        {
          model: Apartment,
          as: "Apartment",
        },
      ],
    });
    if (!foundContract)
      return res.status(404).json({ message: "Contract not found" });
    res.json(foundContract);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const createContract = async (req: CustomRequest, res: Response) => {
  if (!req?.user?.id) {
    throw new Error("User ID is not defined");
  }
  const accountId = req.user.id;
  const {
    months_amount,
    value,
    start_date,
    end_date,
    renter_id,
    apartment_id,
    is_expired,
    months_upgrade,
  } = req.body;
  try {
    const foundApartment = (await Apartment.findByPk(
      apartment_id
    )) as ApartmentAttributes;
    if (!foundApartment) {
      return res.status(414).json({ message: "Apartamento no encontrado" });
    }

    const foundRenter = (await Renter.findByPk(renter_id)) as RenterAttributes;
    if (!foundRenter) {
      return res.status(414).json({ message: "Inquilino no encontrado" });
    }

    const foundContracts = await Contract.findOne({
      where: {
        account_id: accountId,
        apartment_id: apartment_id,
        [Op.or]: [
          {
            start_date: {
              [Op.lte]: start_date,
            },
            end_date: {
              [Op.gte]: start_date,
            },
          },
          {
            start_date: {
              [Op.lte]: end_date,
            },
            end_date: {
              [Op.gte]: end_date,
            },
          },
          {
            start_date: {
              [Op.gte]: start_date,
            },
            end_date: {
              [Op.lte]: end_date,
            },
          },
        ],
      },
    });

    if (foundContracts) {
      return res
        .status(414)
        .json({ message: "ya existe un contrato con la misma fecha" });
    }
    if (foundApartment.active_contract_id) {
      return res
        .status(415)
        .json({ message: "El apartamento ya esta alquilado" });
    }
    if (foundRenter.active_contract_id) {
      return res
        .status(416)
        .json({ message: "El inquilino ya tiene un contrato" });
    }

    const newContract = await Contract.create({
      months_amount,
      value,
      start_date,
      end_date,
      renter_id,
      apartment_id,
      is_expired,
      months_upgrade,
      account_id: accountId,
      upgrade_value: !months_upgrade ? null : value,
      upgrade_start_date: !months_upgrade ? null : start_date,
      upgrade_end_date: !months_upgrade
        ? null
        : dayjs(start_date).add(months_upgrade, "M").format("YYYY/MM/DD"),
    });

    if (!newContract)
      return res.status(414).json({ message: "No se pudo crear el contrato" });

    if (dayjs(end_date).isAfter(dayjs())) {
      foundApartment.rented = true;
      foundApartment.active_contract_id = newContract.getDataValue("id");
      foundApartment.active_renter_id = renter_id;

      foundRenter.active_contract_id = newContract.getDataValue("id");
      foundRenter.active_apartment_id = apartment_id;
      foundRenter.save();
      foundApartment.save();
    }
    res.json(newContract);
  } catch (error: unknown) {
    console.log(error);
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const cancelContract = async (req: CustomRequest, res: Response) => {
  if (!req?.user?.id) {
    throw new Error("User ID is not defined");
  }
  const accountId = req.user.id;
  const { id } = req.body;
  try {
    const foundContract = (await Contract.findByPk(id)) as ContractAttributes;
    if (!foundContract) {
      return res.status(404).json({ message: "Contrato no encontrado" });
    }
    const apartmentId = foundContract.getDataValue("apartment_id");
    const renterId = foundContract.getDataValue("renter_id");
    const foundApartment = (await Apartment.findByPk(
      apartmentId
    )) as ApartmentAttributes;
    const foundRenter = (await Renter.findByPk(renterId)) as RenterAttributes;

    if (!foundApartment || !foundRenter) {
      return res.status(404).json({ message: "Datos no encontrados" });
    }

    foundApartment.rented = false;
    foundApartment.active_contract_id = null;
    foundApartment.active_renter_id = null;

    foundRenter.active_contract_id = null;
    foundRenter.active_apartment_id = null;

    foundContract.is_cancelled = true;
    foundContract.is_expired = true;
    foundContract.end_date = dayjs().format("YYYY/MM/DD");

    foundApartment.save();
    foundRenter.save();
    foundContract.save();

    res.json({ message: "Contrato cancelado" });
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const updateContract = async (req: Request, res: Response) => {
  try {
    const {
      months_amount,
      value,
      start_date,
      end_date,
      renter_id,
      apartment_id,
      is_expired,
      months_upgrade,
      upgrade_value,
      upgrade_start_date,
      upgrade_end_date,
    } = req.body;
    const { id } = req.params;
    const foundContract = await Contract.findByPk(id);

    if (!foundContract) {
      return res.status(404).json({ message: "Contract not found" });
    }

    await foundContract.update({
      months_amount,
      value,
      start_date,
      end_date,
      renter_id,
      apartment_id,
      is_expired,
      months_upgrade,
      upgrade_value,
      upgrade_start_date,
      upgrade_end_date,
    });

    res.json(foundContract);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};

export const deleteContract = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const contract = (await Contract.findByPk(
      id
    )) as unknown as ContractAttributes;

    const renter = (await Renter.findByPk(
      contract?.renter_id
    )) as unknown as RenterAttributes;

    const apartment = (await Apartment.findByPk(
      contract?.apartment_id
    )) as unknown as ApartmentAttributes;

    const payments = await Payment.findAll({
      where: { contract_id: id },
    });

    renter.update({
      active_contract_id: null,
      active_apartment_id: null,
    });

    apartment.update({
      active_contract_id: null,
      rented: false,
      active_renter_id: null,
    });
    if (payments.length) {
      contract.update({ is_cancelled: true });
    } else {
      await Contract.destroy({ where: { id } });
    }
    res.sendStatus(204);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
