import express from "express";
import { success } from "./helper.mjs";
import { Comment } from "../db/sequelize.mjs";
import { ValidationError, Op } from "sequelize";

//Instance de express, afin de créer des routes
const commentRouter = express();

//Routes GET liste user
commentRouter.get("/", (req, res) => {
  return (
    Comment.findAll()
      //Récupération liste user
      .then((Comments) => {
        const message = "La liste des commentaires a bien été récupérée";
        res.json(success(message, Comments));
      })
      //Gestion erreur 500
      .catch((error) => {
        res
          .status(500)
          .json("une erreur est survenue lors de la récupération des users");
      })
  );
});

//Routes GET commentaire avec id
commentRouter.get("/:id", (req, res) => {
  // Rechercher un commentaire par sa clé primaire (id)
  Comment.findByPk(req.params.id)

    .then((Comment) => {
      //Gestion erreur 404
      if (Comment === null) {
        const message =
          "Le commentaires demandé n'existe pas. Merci de réesayer avec un autre identifiant";
        return res.status(404).json({ message });
      }
      //Récupération commentaire
      const message = `Le commentaire don't l'id vaut ${Comment.id} a bien été récupéré`;
      res.json(success(message, Comment));
    })
    //Gestion erreur 500
    .catch((error) => {
      const message =
        "Le commentaire n'a pas pu être récupéré. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

//Routes POST comments
commentRouter.post("/", (req, res) => {
  //Créer un nouveaux commentaire a partir des données
  Comment.create(req.body).then((createdComment) => {
    const message = `Le commentaire ${createdComment.id} a bien été créé !`;
    res.json(success(message, createdComment));
  }).catch((error)=> {
    if(error instanceof ValidationError){
        return res.status(400).json({message: error.message, data:error})
    }
    const message = "Le commentaire n'a pas pu être ajouté. Merci de réessayer dans quelques instants"
    res.status(500).json({message, data: error})
});
});

//Routes PUT comments
commentRouter.put("/:id", (req, res) => {
  const CommentId = req.params.id;
  Comment.update(req.body, { where: { id: CommentId } })
    .then((_) => {
      return Comment.findByPk(CommentId).then((updatedComment) => {
        //Gestion erreur 400
        if (updatedComment === null) {
          const message =
            "Le commentaire demandé n'existe pas. Merci de réessayer avec un atre identifiant.";
          return res.status(404).json({ message });
        }
        //Update de l'commentaire
        const message = `Le commentaire  dont l'id vaut ${updatedComment.id} a été mis à jour avec success`;
        res.json(success(message, updatedComment));
      });
    })
    //Gestion erreur 500
    .catch((error) => {
      const message =
        "Le commentaire n'a pas pu être mis à jour. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

//Routes DELETE commentaire
commentRouter.delete("/:id", (req, res) => {
    // Rechercher un commentaire par sa clé primaire (id)
    Comment.findByPk(req.params.id)
      .then((deletedComment) => {
        //Gestion erreur 400
        if (deletedComment === null) {
          const message =
            "Le commentaire demandé n'existe pas. Merci de réessayer avec un autre identifiant";
          return res.status(404).json({ message });
        }
        return Comment.destroy({
          where: { id: deletedComment.id },
          //Delete de l'commentaire
        }).then((_) => {
          const message = `Le commentaire ${deletedComment.id} a bien été supprimé !`;
          res.json(success(message, deletedComment));
        });
      })
      //Gestion erreur 500
      .catch((error) => {
        const message =
          "Le commentaire n'a pas pu être supprimé. Merci de réessayer dans quelques instants";
        res.status(500).json({ message, data: error });
      });
  });
  
  export { commentRouter };
