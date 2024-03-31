import { DATE } from "sequelize";
import { sequelize, DataTypes } from "../db";

const StudentModel = sequelize.define("students", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: false,
    },
    date_of_birth: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: false
    },
    gender: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  });
  
  export default StudentModel;