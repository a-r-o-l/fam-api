import { Request, Response } from "express";
import { Contract } from "../../models/Contract";
import { Model } from "sequelize";

type ContractsAttributes = {
  id?: number;
  months_amount: number;
  value: number;
  start_date?: string;
  end_date?: string;
  renterId?: number;
  apartmentId?: number;
  isExpired?: boolean;
};

export const updateContract = async (req: Request, res: Response) => {
  try {
    const {
      months_amount,
      value,
      start_date,
      end_date,
      renterId,
      apartmentId,
      isExpired,
    } = req.body;
    const { id } = req.params;
    const foundContract = (await Contract.findByPk(
      id
    )) as Model<ContractsAttributes> | null;
    if (!foundContract)
      return res.status(404).json({ message: "Contract not found" });
    (foundContract as unknown as ContractsAttributes).months_amount =
      months_amount;
    (foundContract as unknown as ContractsAttributes).value = value;
    (foundContract as unknown as ContractsAttributes).start_date = start_date;
    (foundContract as unknown as ContractsAttributes).end_date = end_date;
    (foundContract as unknown as ContractsAttributes).renterId = renterId;
    (foundContract as unknown as ContractsAttributes).apartmentId = apartmentId;
    (foundContract as unknown as ContractsAttributes).isExpired = isExpired;
    foundContract.save();
    res.json(foundContract);
  } catch (error: unknown) {
    return res.status(500).json({ message: (error as Error).message });
  }
};
