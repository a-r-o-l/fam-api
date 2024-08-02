import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import { Apartment } from "./Apartment";

export const Property = sequelize.define(
  "Property",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.ENUM("building", "house", "apartment", "lounge"),
      defaultValue: "building",
    },
    address: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    image_url: {
      type: DataTypes.STRING(200),
      allowNull: true,
    },
    contract_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sold: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    apartments: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    floor: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    apartment: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    selling_price: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hidden: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: true,
    },
  },
  {
    tableName: "Property",
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);

Property.hasMany(Apartment, { foreignKey: "property_id", sourceKey: "id" });
Apartment.belongsTo(Property, { foreignKey: "property_id", targetKey: "id" });
