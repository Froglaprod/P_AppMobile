import express from 'express';
import { Book } from '../db/sequelize.mjs';

//Instance de express, afin de créer des routes
const assessmentRouter = express.Router();

//Route pour récupérer les epubs
assessmentRouter.get('/:id/epub', (req, res) => {
  const bookId = req.params.id;

  //Requête à la base de données pour recupérer les epubs
  Book.findByPk(bookId)
    .then((book) => {
      if (!book) {
        return res.status(404).json({ error: 'Livre non trouvé' });
      }

      //Stock le epub
      const epubFile = book.epub;

      // Message de succes
      res.setHeader('Content-Type', 'application/epub+zip');
      res.setHeader('Content-Disposition', `attachment; filename="${book.title}.epub"`);
      res.send(epubFile);
    })
    //Message d'erreur
    .catch((error) => {
      console.error('Erreur lors de la récupération du fichier EPUB :', error);
      res.status(500).json({ error: 'Erreur Interne du Serveur lors de la récupération du fichier EPUB' });
    });
});

export default assessmentRouter;
