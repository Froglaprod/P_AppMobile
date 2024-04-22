import express from "express";
import { success } from "./helper.mjs";
import { Category } from "../db/sequelize.mjs";
import { Book } from "../db/sequelize.mjs";
//Permet d'utilise des element de comparaison
import { ValidationError, Op } from "sequelize";

//Instance de express, afin de créer des routes
const categorysRouter = express();

//Routes GET liste category

categorysRouter.get("/", (req, res) => {
  if (req.query.name) {
    return Category.findAll({
      where: { name: { [Op.like]: `%${req.query.name}%` } },
    }).then((categorys) => {
      const message = `Il y a ${categorys.length} categories qui correspondent au terme de la recherche`;
      
      res.json(success(message, categorys));
    });
  }
  return (
    Category.findAll()
      //Récupération liste category
      .then((categorys) => {
        const message = "La liste des category a bien été récupérée";
        res.json(success(message, categorys));
      })
      //Gestion erreur 500
      .catch((error) => {
        res
          .status(500)
          .json("une erreur est survenue lors de la récupération des category");
      })
  );
});



//Routes GET category avec id
categorysRouter.get("/:id", (req, res) => {
  // Rechercher un category par sa clé primaire (id)
  Category.findByPk(req.params.id)

    .then((categorys) => {
      //Gestion erreur 404
      if (categorys === null) {
        const message =
          "Le category demandé n'existe pas. Merci de réesayer avec un autre identifiant";
        return res.status(404).json({ message });
      }
      //Récupération category
      const message = `Le category don't l'id vaut ${categorys.id} a bien été récupéré`;
      res.json(success(message, categorys));
    })
    //Gestion erreur 500
    .catch((error) => {
      const message =
        "Le category n'a pas pu être récupéré. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});
// Routes GET category avec id et tous ses livres
categorysRouter.get("/:id/books", (req, res) => {
  // Rechercher un category par sa clé primaire (id)
  Category.findByPk(req.params.id)
    .then((categorys) => {
      //Gestion erreur 404
      if (categorys === null) {
        const message =
          "Le category demandé n'existe pas. Merci de réesayer avec un autre identifiant";
        return res.status(404).json({ message });
      }
      //Récupération category
      const message = `Le category don't l'id vaut ${categorys.id} a bien été récupéré`;
      //Recherche de livres avec le même category id
      return Book.findAll({
        where:{category_id :req.params.id},
      }).then((books)=>{
        const message = `Il y a ${books.length} livres qui correspondent au terme de la recherche`;
        res.json(success(message, books))
      })

      //res.json(success(message, categorys));
    })
    //Gestion erreur 500
    .catch((error) => {
      const message =
        "Le category n'a pas pu être récupéré. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

// Get liste livre par rapport à une catégorie
categorysRouter.get("/category_books", (req, res) => {
  if (req.query.category) {
    const categoryName = req.query.category;
 
    Category.findOne({
      where: { name: { [Op.like]: `%${categoryName}%` } },
      include: 'books', // 'books' est l'alias défini dans les associations
    })
      .then((category) => {
        if (!category) {
          const message = `Aucune catégorie trouvée avec le nom ${categoryName}`;
          return res.status(404).json({ message, data: null, category: null });
        }
 
        const books = category.books; // Utilisez l'alias défini dans les associations
        const message = `Voici tous les livres ayant comme catégorie ${category.name}`;
        res.json(success(message, books, category));
      })
      .catch((error) => {
        const message = "Une erreur est survenue lors de la récupération des livres de la catégorie. Merci de réessayer dans quelques instants.";
        res.status(500).json({ message, data: error, category: null });
      });
  }
});
//Routes POST category
categorysRouter.post("/", (req, res) => {
  //Créer un nouveaux category a partir des données
  Category.create(req.body).then((createdcategory) => {
    const message = `Le category ${createdcategory.name} a bien été créé !`;
    res.json(success(message, createdcategory));
  }).catch((error)=> {
    if(error instanceof ValidationError){
        return res.status(400).json({message: error.message, data:error})
    }
    const message = "Le category n'a pas pu être ajouté. Merci de réessayer dans quelques instants"
    res.status(500).json({message, data: error})
});
});

//Routes PUT category
categorysRouter.put("/:id", (req, res) => {
  const categoryId = req.params.id;
  Category.update(req.body, { where: { id: categoryId } })
    .then((_) => {
      return Category.findByPk(categoryId).then((updatedCategory) => {
        //Gestion erreur 400
        if (updatedCategory === null) {
          const message =
            "Le category demandé n'existe pas. Merci de réessayer avec un atre identifiant.";
          return res.status(404).json({ message });
        }
        //Update de l'category
        const message = `Le category ${updatedCategory.name} dont l'id vaut ${updatedCategory.id} a été mis à jour avec success`;
        res.json(success(message, updatedCategory));
      });
    })
    //Gestion erreur 500
    .catch((error) => {
      const message =
        "Le category n'a pas pu être mis à jour. Merci de réessayer dans quelques instants.";
      res.status(500).json({ message, data: error });
    });
});

//Routes DELETE category
categorysRouter.delete("/:id", (req, res) => {
  // Rechercher un category par sa clé primaire (id)
  Category.findByPk(req.params.id)
    .then((deletedCategory) => {
      //Gestion erreur 400
      if (deletedCategory === null) {
        const message =
          "Le category demandé n'existe pas. Merci de réessayer avec un autre identifiant";
        return res.status(404).json({ message });
      }
      return Category.destroy({
        where: { id: deletedCategory.id },
        //Delete de l'category
      }).then((_) => {
        const message = `Le category ${deletedCategory.name} a bien été supprimé !`;
        res.json(success(message, deletedCategory));
      });
    })
    //Gestion erreur 500
    .catch((error) => {
      const message =
        "Le category n'a pas pu être supprimé. Merci de réessayer dans quelques instants";
      res.status(500).json({ message, data: error });
    });
});

export { categorysRouter };
