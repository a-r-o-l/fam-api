import { DataTypes, Op } from "sequelize";
import { sequelize } from "../database/database";
import { Apartment } from "./Apartment";
import { Property } from "./Property";
import dayjs from "dayjs";

export const Contract = sequelize.define(
  "Contract",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    months_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    property_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    apartment_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    property_type: {
      type: DataTypes.ENUM("building", "house", "apartment", "lounge"),
      defaultValue: "building",
      allowNull: false,
    },
    renter: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    is_expired: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    upgrade: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    hidden: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    account_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "Contract",
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    hooks: {
      beforeFind: async (options: any) => {
        const now = dayjs();
        await Contract.update(
          {
            is_expired: true,
          },
          {
            where: {
              end_date: {
                [Op.lt]: now,
              },
              is_expired: false,
            },
          }
        );
      },
    },
  }
);

Contract.belongsTo(Apartment, { foreignKey: "apartment_id", targetKey: "id" });

Apartment.hasMany(Contract, { foreignKey: "apartment_id", sourceKey: "id" });
Contract.belongsTo(Property, { foreignKey: "property_id", targetKey: "id" });

Property.hasMany(Contract, { foreignKey: "property_id", sourceKey: "id" });
