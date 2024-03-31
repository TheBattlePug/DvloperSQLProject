import { sequelize, DataTypes } from "../db";

const EnrollmentModel = sequelize.define("enrollments", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
    studentId: {
        type: DataTypes.UUID,
    },
    courseId: {
        type: DataTypes.UUID,
    },
});

export default EnrollmentModel