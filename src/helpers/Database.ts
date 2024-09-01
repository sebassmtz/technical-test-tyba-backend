import { Sequelize } from "sequelize"
import dotenv from "dotenv"

dotenv.config()

// Ensure DATABASE_URL is defined
const databaseUrl = process.env.DATABASE_URL
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not defined in the environment variables.")
}

// Initialize Sequelize
export const sequelize = new Sequelize(databaseUrl)
