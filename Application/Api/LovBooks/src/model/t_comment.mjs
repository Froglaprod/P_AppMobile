import { DataTypes } from "sequelize";
import { sequelize } from "../db/sequelize.mjs";

const CommentModelTable = (sequelize, DataTypes) => {
  return sequelize.define(
    "t_comments",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          // Validation requisent
          notEmpty: {
            // Message d'erreur
            msg: "Le contenu du commentaire ne peut pas être vide.",
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
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
          // Validation requisent
          isDate: {
            // Message d'erreur
            msg: "La date du commentaire doit être au format valide.",
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

export { CommentModelTable };
