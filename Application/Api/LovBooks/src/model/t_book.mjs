import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.mjs";

// Modèle de table "t_book"
const BookModelTable = (sequelize, DataTypes) => {
  return sequelize.define(
    "t_book",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        validate: {
          // Validation requisent
          isInt: {
            // Message d'erreur
            msg: "L'ID doit être un entier.",
          },
          min: {
            args: [1],
            // Message d'erreur
            msg: "L'ID doit être supérieur à 0.",
          },
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          // Validation requisent
          notEmpty: {
            // Message d'erreur
            msg: "Le titre ne peut pas être vide.",
          },
        },
      },
      number_of_pages: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          // Validation requisent
          isInt: {
            // Message d'erreur
            msg: "Le nombre de pages doit être un entier.",
          },
          min: {
            args: [1],
            // Message d'erreur
            msg: "Le livre doit avoir au moins une page.",
          },
        },
      },
      year_of_publication: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          // Validation requisent
          isInt: {
            // Message d'erreur
            msg: "L'année de publication doit être un entier.",
          },
        },
      },
      average_ratings: {
        type: DataTypes.FLOAT,
        validate: {
          // Validation requisent
          isFloat: {
            // Message d'erreur
            msg: "La note moyenne doit être un nombre.",
          },
        },
      },
      cover_image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          // Validation requisent
          notEmpty: {
            // Message d'erreur
            msg: "L'image de couverture ne peut pas être vide.",
          },
        },
      },
      extract_pdf: {
        type: DataTypes.STRING,
        allowNull: false,
        // Validation requisent
        validate: {
          notEmpty: {
            // Message d'erreur
            msg: "Le lien vers le PDF ne peut pas être vide.",
          },
        },
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      summary: {
        type: DataTypes.TEXT,
        // Validation requisent
        validate: {
          notEmpty: {
            // Message d'erreur
            msg: "Le résumé ne peut pas être vide.",
          },
        },
      },
    },
    // Colonne créer automiquements
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};

export { BookModelTable };
