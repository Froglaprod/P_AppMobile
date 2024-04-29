import express from "express";
import { sequelize } from "../db/sequelize.mjs";
import { DataTypes } from "sequelize";
import { EpubModelTable } from "../model/t_epub.mjs";

const epubRouter = express.Router();

// Route pour obtenir les EPUB par ID
epubRouter.get("/:id", async (req, res) => {
  const epubId = req.params.id;
  try {
    const EpubModel = EpubModelTable(sequelize, DataTypes);

    //Récupérer l'EPUB par ID
    const epubEntry = await EpubModel.findOne({
      where: {
        id: epubId,
      },
    });
    //Message réponse (erreur & réussite)
    if (epubEntry) {
      const epubData = epubEntry.epub;
      console.log("Données du fichier récupérées avec succès :", epubData);
      res.status(200).json(epubData);
    } else {
      console.log("Aucun fichier trouvé pour l'ID spécifié :", epubId);
      res.status(404).send("Aucun fichier trouvé pour l'ID spécifié.");
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des fichiers EPUB :", error);
    res.status(500).send("Erreur lors de la récupération des fichiers EPUB.");
  }
});

export default epubRouter;
