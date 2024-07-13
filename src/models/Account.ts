import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import { Building } from "./Building";
import { Apartment } from "./Apartment";
import { Renter } from "./Renter";
import { Contract } from "./Contract";
import { Payment } from "./Payment";

export const Account = sequelize.define(
  "Account",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    image_url: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: "user",
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    googleId: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    tableName: "Account",
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);

Account.hasMany(Building, { foreignKey: "account_id" });
Building.belongsTo(Account, { foreignKey: "account_id", targetKey: "id" });

Account.hasMany(Apartment, { foreignKey: "account_id" });
Apartment.belongsTo(Account, { foreignKey: "account_id", targetKey: "id" });

Account.hasMany(Renter, { foreignKey: "account_id" });
Renter.belongsTo(Account, { foreignKey: "account_id", targetKey: "id" });

Account.hasMany(Contract, { foreignKey: "account_id" });
Contract.belongsTo(Account, { foreignKey: "account_id", targetKey: "id" });

Account.hasMany(Payment, { foreignKey: "account_id" });
Payment.belongsTo(Account, { foreignKey: "account_id", targetKey: "id" });
