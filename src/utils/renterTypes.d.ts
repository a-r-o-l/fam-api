import { Model } from "sequelize";

interface RenterInterface {
  id?: number;
  name: string;
  lastname: string;
  email?: string;
  dni?: string;
  phone?: string;
  image_url?: string;
  active_contract_id?: number | null;
  active_apartment_id?: number | null;
  account_id: number;
  hidden?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface RenterAttributes extends RenterInterface, Model<RenterInterface> {
  save(options?: SaveOptions): Promise<this>;
  getDataValue(key: string): any;
  update(data: Partial<RenterInterface>): Promise<this>;
}

export { RenterInterface, RenterAttributes };
