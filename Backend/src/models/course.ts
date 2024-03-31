import { sequelize, DataTypes } from "../db";

const CourseModel = sequelize.define("courses", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: true,
    },
    capacity: {
      type: DataTypes.INTEGER,
      defaultValue: 20,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: true,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: true,
    },
  });
  
  export default CourseModel;