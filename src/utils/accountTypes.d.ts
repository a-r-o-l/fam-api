import { Model } from "sequelize";

interface AccountInterface {
  id?: number;
  user_name?: string;
  password?: string;
  email?: string;
  image_url?: string;
  role?: string;
  verified?: boolean;
  google_id?: string;
  is_new?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  Subscriptions?: any[];
}

interface AccountAttributes extends Model<AccountInterface>, AccountInterface {
  save(options?: SaveOptions): Promise<this>;
  getDataValue(key: string): any;
  update(data: Partial<AccountInterface>): Promise<this>;
}

export { AccountInterface, AccountAttributes };
