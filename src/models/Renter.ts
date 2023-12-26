import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import { Apartment } from "./Apartment";
import { Contract } from "./Contract";

export const Renter = sequelize.define("Renter", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    dni: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    tel: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    apartmentId: {
        type: DataTypes.INTEGER,
    }
    }
)

Renter.hasOne(Apartment, {foreignKey: "renterId",as:'renter', sourceKey: "id", onUpdate: 'CASCADE'})
Apartment.belongsTo(Renter, {foreignKey: "renterId",as:'renter', targetKey: "id", onUpdate: 'CASCADE'})