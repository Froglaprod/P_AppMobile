import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.mjs";

// Modèle de table "t_customer"
const CustomerModelTable = (sequelize, DataTypes) => {
  return sequelize.define(
    "t_customer",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      pseudo: {
        type: DataTypes.STRING,
        allowNull: false,
        // Validation requisent
        validate: {
          notEmpty: {
            // Message d'erreur
            msg: "Le pseudo ne peut pas être vide.",
          },
          is: {
            args: /^[^\s]*$/,
            msg: "Le pseudo ne peut pas contenir d'espaces.",
          },
        },
      },
      date_enter: {
        type: DataTypes.DATE,
        allowNull: true,
        // Validation requisent
        validate: {
          isDate: {
            msg: "La date doit être au format valide.",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        // Validation requisent
        validate: {
          notEmpty: {
            // Message d'erreur
            msg: "Le mot de passe ne peut pas être vide.",
          },
        },
      },
    },
    // Colonne créer automiquement
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};

export { CustomerModelTable };
