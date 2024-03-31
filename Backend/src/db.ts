require("dotenv").config();
import { Sequelize, DataTypes } from "sequelize";

const MYSQL_URL = process.env.DATABASE_URL as unknown as string;

console.log("")
console.log("url: " + MYSQL_URL)
console.log("")


//const sequelize = new Sequelize(MYSQL_URL);

const sequelize = new Sequelize(
  process.env.MYSQL_DB ?? 'mysql',         // Provide a default value if MYSQL_DB is undefined
  process.env.MYSQL_USER ?? 'root',      // Provide a default value if MYSQL_USER is undefined
  process.env.MYSQL_PASSWORD ?? 'password', // Provide a default value if MYSQL_PASSWORD is undefined
  {
    host: process.env.MYSQL_HOST ?? 'localhost', // Provide a default value if MYSQL_HOST is undefined
    port: parseInt(process.env.MYSQL_PORT ?? '3306'), // Convert to integer and provide a default value if MYSQL_PORT is undefined
    dialect: 'mysql',
  }
);

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("✅ Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

export { connectDB, sequelize, Sequelize, DataTypes };
