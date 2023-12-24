import { DataTypes } from "sequelize";
import { sequelize } from "../database/database";

export const Task = sequelize.define("Task", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
        
    },
    done: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
}, {
    timestamps: false
})