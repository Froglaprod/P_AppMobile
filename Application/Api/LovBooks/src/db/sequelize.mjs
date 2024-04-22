// Import des models
import { DataTypes, Sequelize } from "sequelize";
import { BookModelTable } from "../model/t_book.mjs";
import { CustomerModelTable } from "../model/t_customer.mjs";
import { AssessmentModelTable } from "../model/t_assessment.mjs";
import { AuthorModelTable } from "../model/t_author.mjs";
import { PublisherModelTable } from "../model/t_publisher.mjs";
import { CategoryModelTable } from "../model/t_category.mjs";
import { CommentModelTable } from "../model/t_comment.mjs";

// Import de données
import { books } from "./mock-book.mjs";
import { customers } from "./mock-customer.mjs";
import { authors } from "./mock-author.mjs";
import { publishers } from "./mock-publisher.mjs";
import { comments } from "./mock-comment.mjs";
import { categorys } from "./mock-category.mjs";
import { assessments } from "./mock-assessment.mjs";

// Informations pour la connexion à la db
const sequelize = new Sequelize("db_lovbooks", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  port: 6033,
  logging: false,
});

// Création des modèles
const Book = BookModelTable(sequelize, DataTypes);
const Customer = CustomerModelTable(sequelize, DataTypes);
const Assessment = AssessmentModelTable(sequelize, DataTypes);
const Author = AuthorModelTable(sequelize, DataTypes);
const Publisher = PublisherModelTable(sequelize, DataTypes);
const Category = CategoryModelTable(sequelize, DataTypes);
const Comment = CommentModelTable(sequelize, DataTypes);

//Liaisons entre models
//Livres / Categories
Book.belongsTo(Category, {
  foreignKey: "category_id",
});
Category.hasMany(Book, {
  foreignKey: "category_id",
});

// Livres / Auteur
Book.belongsTo(Author, {
  foreignKey: "author_id",
});
Author.hasMany(Book, {
  foreignKey: "author_id",
});

// Livres / Éditeur
Book.belongsTo(Publisher, {
  foreignKey: "publisher_id",
});
Publisher.hasMany(Book, {
  foreignKey: "publisher_id",
});

// Livres / Commentaire

Book.hasMany(Comment, {as:"comment",foreignKey: "id"});
Comment.hasOne(Book, {foreignKey: "comment_id"});


// Livres / Note
Book.hasMany(Assessment, {
  foreignKey: "id", 
});
Assessment.hasOne(Book, {
  foreignKey: "assessment_id", 
});

// Livres / Client
Book.belongsTo(Customer, {
  foreignKey: "customer_id", 
});
Customer.hasMany(Book, {
  foreignKey: "customer_id", 
});

// Synchronisation avec la db
let initDB = () => {
  // Force la synchronisation (supprime toutes les données également)
  return sequelize.sync({ force: true }).then((_) => {
    importAuthors();
    importCategory();
    importCustomers();
    importAssessment();
    importComment();
    importPublisher();
    importBooks();
    console.log("La base de données a bien été synchronisée");
  });
};

// Import de tous les livres du "mock-book"
const importBooks = () => {
  books.map((book) => {
    Book.create({
      // Données des champs
      title: book.title,
      category_id: book.category_id,
      author_id: book.author_id,
      assessment_id: book.assessment_id,
      comment_id: book.comment_id,
      publisher_id: book.publisher_id,
      customer_id: book.customer_id,
      number_of_pages: book.number_of_pages,
      year_of_publication: book.year_of_publication,
      average_ratings: book.average_ratings,
      cover_image: book.cover_image,
      extract_pdf: book.extract_pdf,
      summary: book.summary,
      publisher_name: book.publisher_name,
    }).then((book) => console.log(book.toJSON()));
    
  });
};

// Import de tous les utilisateurs du "mock-customer"
const importCustomers = () => {
  customers.map((customer) => {
    Customer.create({
      // Données des champs
      pseudo: customer.pseudo,
      date_enter: customer.date_enter,
      password: customer.password,
    }).then((customer) => console.log(customer.toJSON()));
  });
};

// Import de tous les auteur du "mock-author"
const importAuthors = () => {
  authors.map((author) => {
    Author.create({
      // Données des champs
      first_name: author.first_name,
      name: author.name
    }).then((author) => console.log(author.toJSON()));
  });
};

// Import de tous les editeurs du "mock-publisher"
const importPublisher = () => {
  publishers.map((publisher) => {
    Publisher.create({
      // Données des champs
      edition_date: publisher.edition_date,
      name: publisher.name
    }).then((publisher) => console.log(publisher.toJSON()));
  }); 
};
 
// Import de tous les commentaires du "mock-comment"
const importComment = () => {
  comments.map((comment) => {
    Comment.create({
      // Données des champs
      customer_id: comment.customer_id,
      created_at: comment.created_at,
      content: comment.content,
      book_id: comment.book_id,
    }).then((comment) => console.log(comment.toJSON()));
  });
};

// Import de tous les notes du "mock-assessment"
const importAssessment = () => {
  assessments.map((assessment) => {
    Assessment.create({
      // Données des champs
      customer_id: assessment.customer_id,
      assessment: assessment.assessment,
      created_at: assessment.created_at,
      book_id: assessment.book_id,
    }).then((assessment) => console.log(assessment.toJSON()));
  });
};

// Import de tous les categories du "mock-category"
const importCategory = () => {
  categorys.map((category) => {
    Category.create({
      // Données des champs
      name: category.name,
    }).then((category) => console.log(category.toJSON()));
  });
};
export { sequelize, Book, Customer, Assessment, Author, Publisher, Category, Comment, initDB };
