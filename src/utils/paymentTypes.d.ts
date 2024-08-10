import { Model } from "sequelize";

type PaymentType = {
  id?: number;
  value?: number | null;
  date: string;
  payed: boolean | null;
  receipt?: string;
  contract_id?: number;
  apartment_id?: number;
  renter_id?: number;
  account_id?: number;
  payment_number?: number;
};

interface PaymentInterface {
  id?: number;
  value?: number | null;
  date: string;
  payed: boolean | null;
  receipt?: string;
  contract_id?: number;
  renter_id?: number;
  apartment_id?: number;
  payment_number?: number;
  account_id?: number;
  hidden?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface PaymentAttributes extends PaymentInterface, Model<PaymentInterface> {
  save(options?: SaveOptions): Promise<this>;
  getDataValue(key: string): any;
  update(data: Partial<PaymentInterface>): Promise<this>;
}

export { PaymentInterface, PaymentAttributes, PaymentType };
