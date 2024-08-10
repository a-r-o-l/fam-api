import { Model } from "sequelize";

interface ApartmentInterface {
  id?: number;
  floor?: string;
  number: string;
  rented?: boolean;
  it_was_sold?: boolean;
  building_id: number;
  active_contract_id?: number | null;
  active_renter_id?: number | null;
  account_id: number;
  hidden?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ApartmentAttributes
  extends Model<ApartmentInterface>,
    ApartmentInterface {
  save(options?: SaveOptions): Promise<this>;
  getDataValue(key: string): any;
  update(data: Partial<ApartmentInterface>): Promise<this>;
}

export { ApartmentInterface, ApartmentAttributes };
