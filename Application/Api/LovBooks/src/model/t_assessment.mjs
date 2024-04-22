import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.mjs";

const AssessmentModelTable = (sequelize, DataTypes) => {
  return sequelize.define(
    "t_assessment",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      assessment: {
        type: DataTypes.FLOAT,
        allowNull: false,
        // Validation requisent
        validate: {
          isFloat: {
            // Message d'erreur
            msg: "L'évaluation doit être un nombre.",
          },
          min: {
            args: [1],
            // Message d'erreur
            msg: "L'évaluation ne peut pas être inférieure à 1.",
          },
          max: {
            args: [5],
            // Message d'erreur
            msg: "L'évaluation ne peut pas être supérieure à 5.",
          },
        },
      },
      // Liasons clef étrangère
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      book_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
          // Validation requisent
          isDate: {
            // Message d'erreur
            msg: "La date de l'évaluation doit être au format valide.",
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

export { AssessmentModelTable };
