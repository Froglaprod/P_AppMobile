import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.mjs";

const CategoryModelTable = (sequelize, DataTypes) => {
  return sequelize.define(
    "t_category",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        // Validation requisent
        validate: {
          notEmpty: {
            // Message d'erreur
            msg: "Le nom de la catégorie ne peut pas être vide.",
          },
        },
      },
    },
    {
      // Colonne créer automiquements
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
      tableName: "t_category"
    }
  );
};

export { CategoryModelTable };
