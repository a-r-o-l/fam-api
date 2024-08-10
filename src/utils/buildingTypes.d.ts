import { Model } from "sequelize";

interface BuildingInterface {
  id?: number;
  address?: string;
  name?: string;
  image_url?: string | null;
  apartments?: number;
  apartments_with_floor?: boolean;
  account_id?: number;
  hidden?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

interface BuildingAttributes
  extends BuildingInterface,
    Model<BuildingInterface> {
  save(options?: SaveOptions): Promise<this>;
  getDataValue(key: string): any;
  update(data: Partial<BuildingInterface>): Promise<this>;
}

export { BuildingInterface, BuildingAttributes };
