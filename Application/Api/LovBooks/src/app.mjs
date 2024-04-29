import express from "express";
import swaggerUi from "swagger-ui-express";
import { sequelize, initDB } from "./db/sequelize.mjs";
import { loginRouter } from "./routes/login.mjs"; 
import { swaggerSpec } from "./swagger.mjs";

import epubRouter from "./routes/epub.mjs";
import { booksRouter } from "./routes/bookRoutes.mjs";
import { customersRouter,  } from "./routes/customerRoutes.mjs";
import { categorysRouter } from "./routes/categoryRoutes.mjs";
import { authorsRouter } from "./routes/authorRoutes.mjs";
import { publisherRouter } from "./routes/publisherRoutes.mjs";
import { assessmentRouter } from "./routes/assessmentRoutes.mjs";
import { commentRouter } from "./routes/commentRoutes.mjs";


const app = express();
const port = 3000;
app.use(express.json());

//Authentification et synchronisation de la db

sequelize
 .authenticate()
 .then((_) => console.log("La connexion à la base de données a bien été établie"))
 .catch((error)=>console.error("Impossible de se connecter à la DB"))
//Synchronisation de la db
initDB();

app.get("/", (req, res) => {
    res.send("Bienvenur sur l'API du projet LovBooks")
})

app.get("/api/", (req, res) => {
    res.redirect(`http://localhost:${port}/`)
})


//Utilise la route pour les livres
app.use("/api/books", booksRouter);

//Utilise la route pour les users
app.use("/api/users", customersRouter);

//Utilise la route pour les categories
app.use("/api/categorys", categorysRouter);

//Utilise la route pour les auteurs
app.use("/api/authors", authorsRouter);

//Utilise la route pour les éditeurs
app.use("/api/publishers", publisherRouter);

//Utilise la route pour les commentaires
app.use("/api/comments", commentRouter);

//Utilise la route pour les notes
app.use("/api/assessments", assessmentRouter);

//Utilise la route pour les logins
app.use("/api/login", loginRouter);

//Utilise la route pour les epubs
app.use("/api/epub", epubRouter);

//Swagger Documentation 
app.use(  
    "/api-docs",  
    swaggerUi.serve,  
    swaggerUi.setup(swaggerSpec, { explorer: true }) 
);

//Erreur 404
app.use(({ res }) => {
    const message = "Impossible de trouver la ressource demandée! Vous pouvez essayer une autre URL."
    res.status(404).json(message)
})

app.listen(port, () => {
    console.log(`L'API de LovBooks tourne sur le port http://localhost:${port}`);
})