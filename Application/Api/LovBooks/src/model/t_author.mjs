import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.mjs";

const AuthorModelTable = (sequelize, DataTypes) => {
  return sequelize.define(
    "t_author",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        // Validation requisent
        validate: {
          notEmpty: {
            // Message d'erreur
            msg: "Le prénom ne peut pas être vide.",
          },
        },
      },
      epub: {
        type: DataTypes.LONGBLOB,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        // Validation requisent
        validate: {
          notEmpty: {
            // Message d'erreur
            msg: "Le nom de famille ne peut pas être vide.",
          },
        },
      },
    },
    {
      // Colonne créer automiquements
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};

export { AuthorModelTable };
