import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize"
import { sequelize } from "../helpers/Database"

import { User } from "./user.model"

export class Transactions extends Model<
  InferAttributes<Transactions>,
  InferCreationAttributes<Transactions>
> {
  declare id: CreationOptional<number>
  declare city: CreationOptional<string>
  declare lat: string
  declare lng: string
  declare createdAt: CreationOptional<Date>

  declare userId: number
}

Transactions.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lng: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Clave foránea
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "transactions",
  }
)
