import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.mjs";

const PublisherModelTable = (sequelize, DataTypes) => {
  return sequelize.define(
    "t_publisher",
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
            msg: "Le nom de l'éditeur ne peut pas être vide.",
          },
        },
      },
      edition_date: {
        type: DataTypes.DATE,
        allowNull: true,
        // Validation requisent
        validate: {
          isDate: {
            // Message d'erreur
            msg: "La date d'édition doit être au format valide.",
          },
        },
      },
    },
    {
      // Colonne créer automiquement
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};

export { PublisherModelTable };
