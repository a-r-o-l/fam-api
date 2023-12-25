import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";
import { Apartment } from "./Apartment";

export const Build = sequelize.define("Build", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    address: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    
}, {
    timestamps: true,
    createdAt: true,
    updatedAt: true
})

Build.hasMany(Apartment, {foreignKey: "buildId", sourceKey: "id"})
Apartment.belongsTo(Build, {foreignKey: "buildId", targetKey: "id"})