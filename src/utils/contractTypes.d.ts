import { Model } from "sequelize";

enum ContractType {
  BUILDING = "building",
  APARTMENT = "apartment",
  HOUSE = "house",
  LOUNGE = "lounge",
}

interface ContractInterface {
  id?: number;
  type?: ContractType;
  months_amount?: number;
  value?: number;
  start_date?: string;
  end_date?: string;
  renter_id?: number;
  apartment_id?: number;
  is_expired?: boolean;
  is_cancelled?: boolean;
  months_upgrade?: number;
  upgrade_value?: number | null;
  upgrade_start_date?: string | null;
  upgrade_end_date?: string | null;
  account_id?: number;
  hidden?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ContractAttributes
  extends ContractInterface,
    Model<ContractInterface> {
  save(options?: SaveOptions): Promise<this>;
  getDataValue(key: string): any;
  update(data: Partial<ContractInterface>): Promise<this>;
}

export { ContractInterface, ContractAttributes };
