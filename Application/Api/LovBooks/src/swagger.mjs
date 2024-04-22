import swaggerJSDoc from "swagger-jsdoc"; 
const options = {  
    definition: {    
        openapi: "3.0.0",    
        info: {      
            title: "API LovBooks",      
            version: "1.0.0",      
            description:        
            "API REST permettant de gérer l'application Lovbooks",    
        },    
        servers: [      
            {        
                url: "http://localhost:3000",      
            },    
        ],    
        components: {      
            securitySchemes: {        
                bearerAuth: {          
                    type: "http",          
                    scheme: "bearer",          
                    bearerFormat: "JWT",        
                },      
            },      
            schemas: {        
                Livre: {          
                    type: "object",          
                    required: ["title", "category", "number_of_pages", "year_of_publication","average_ratings", "cover_image", "extract_pdf","summary"],          
                    properties: {            
                        id: {              
                            type: "integer",              
                            description: "L'identifiant unique du produit.",            
                        },            
                        title: {              
                            type: "string",              
                            description: "Le title du livre.",            
                        },  
                        category: {              
                            type: "string",              
                            description: "Le catégorie du livre.",            
                        },           
                        number_of_pages: {              
                            type: "integer",              
                            description: "Le nombre de pages du livre.",            
                        },   
                        year_of_publication: {              
                            type: "integer",              
                            description: "L'année de publication du livre.",            
                        },      
                        average_ratings:{
                            type: "float",              
                            description: "Critiques de livres.",     
                        },
                        cover_image: {              
                            type: "string",              
                            description: "L'image du livre.",            
                        },   
                        extract_pdf: {              
                            type: "string",                   
                            description: "Le extract du livre.",           
                        },          
                        summary : {
                            type: "text",                   
                            description: "Le description du livre.",         
                        }
                    },        
                },        
                // Ajoutez d'autres schémas ici si nécessaire      
                Customer:{

                    type:"object",
                    required : ["pseudo", "date_enter", "password"],
                    properties:{
                        id: {              
                            type: "integer",              
                            description: "L'identifiant unique de l'utilisateeur.",            
                        },            
                        pseudo: {              
                            type: "string",              
                            description: "Le nom de l'utilisateur.",            
                        },  
                        date_enter: {              
                            type: "date",              
                            description: "Le date de creation de l'utilisateur.",            
                        },           
                        password: {              
                            type: "string",              
                            description: "Le mot de passe de l'utilisateur.",            
                        },   
                    }
                },
                Author:{
                    type:"object",
                    required : ["first_name", "name"],
                    properties:{
                        id: {              
                            type: "integer",              
                            description: "L'identifiant unique de l'author.",            
                        },            
                        first_name: {              
                            type: "string",              
                            description: "Le prénom de l'author.",            
                        },  
                        name: {              
                            type: "string",              
                            description: "Le nom de l'author.",            
                        },              
                    }
                },
                Category:{

                    type:"object",
                    required : ["pseudo", "name"],
                    properties:{
                        id: {              
                            type: "integer",              
                            description: "L'identifiant unique du categorie.",            
                        },            
                        name: {              
                            type: "string",              
                            description: "Le nom du categorie.",            
                        },                             
                    }
                },
                Publisher:{
                    type:"object",
                    required : ["name", "edition_date"],
                    properties:{
                        id: {              
                            type: "integer",              
                            description: "L'identifiant unique du publisher.",            
                        },            
                        name: {              
                            type: "string",              
                            description: "Le nom du publisher.",            
                        }, 
                        edition_date: {              
                            type: "date",              
                            description: "La date d'édition.",            
                        },                             
                    }
                },
                Comment:{
                    type:"object",
                    required : ["content", "customer_id", "book_id", "created_at"],
                    properties:{
                        id: {              
                            type: "integer",              
                            description: "L'identifiant unique du commentaire.",            
                        },            
                        content: {              
                            type: "string",              
                            description: "Le content du commentaire.",            
                        }, 
                        customer_id: {              
                            type: "integer",              
                            description: "L'identifiant de l'utilisateur du commentaire.",            
                        }, 
                        book_id: {              
                            type: "integer",              
                            description: "L'identifiant de le livre du commentaire.",            
                        }, 
                        created_at: {              
                            type: "date",              
                            description: "La date de creation.",            
                        },                             
                    }
                },
                Assessment:{
                    type:"object",
                    required : ["assessment", "customer_id", "book_id", "created_at"],
                    properties:{
                        id: {              
                            type: "integer",              
                            description: "L'identifiant unique du note.",            
                        },            
                        assessment: {              
                            type: "integer",              
                            description: "Le note.",            
                        }, 
                        customer_id: {              
                            type: "integer",              
                            description: "L'identifiant de l'utilisateur du note.",            
                        }, 
                        book_id: {              
                            type: "integer",              
                            description: "L'identifiant de le livre du note.",            
                        }, 
                        created_at: {              
                            type: "date",              
                            description: "La date de creation.",            
                        },                             
                    }
                },
                
            },    
        },    
        security: [      
            {        
                bearerAuth: [],      
            },    
        ],  
    },  
    apis: ["./src/routes/*.mjs"], 
    // Chemins vers vos fichiers de route 
}; 

const swaggerSpec = swaggerJSDoc(options); 
export { swaggerSpec };