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
    
}, {
    timestamps: true,
    createdAt: true,
    updatedAt: true
})

Renter.hasMany(Contract, {foreignKey: "renterId", sourceKey: "id"})
Contract.belongsTo(Renter, {foreignKey: "renterId",as:'renter', targetKey: "id"})