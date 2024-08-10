import { Model } from "sequelize";

interface HouseInterface {
  id?: number;
  name: string;
  address: string;
  image_url?: string;
  hidden?: boolean;
  account_id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface HouseAttributes extends Model<HouseInterface> {
  save(options?: SaveOptions): Promise<this>;
  getDataValue(key: string): any;
  update(data: Partial<HouseInterface>): Promise<this>;
}

export { HouseInterface, HouseAttributes };
