import express from "express"; 
import bcrypt from "bcrypt"; 
import jwt from "jsonwebtoken"; 
import { Customer } from "../db/sequelize.mjs"; 
import { privateKey } from "../auth/private_key.mjs"; 

const loginRouter = express(); 

loginRouter.post("/", (req, res) => { 
    Customer.findOne({ where: { pseudo: req.body.pseudo } })    
    .then((customer) => {      
        if (!customer) {        
            const message = `L'utilisateur demandé n'existe pas`;        
            return res.status(404).json({ message });
              }      
              bcrypt        
              .compare(customer.password, req.body.password)        
              .then((isPasswordValid) => {          
                if (customer.password != req.body.password) {            
                    const message = `Le mot de passe est incorrecte.`;            
                    return res.status(401).json({ message });          
                } else {            
                    // JWT            
                    const token = jwt.sign({ customerId: customer.id }, privateKey, {              
                        expiresIn: "1y",            
                    });            
                    const message = `L'utilisateur a été connecté avec succès`;            
                    return res.json({ message, data: customer, token });          
                }        
            });    
        })    
        .catch((error) => {      
            const message = `L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants`;      
            return res.json({ message, data: error });    
        }); 
    }); 
    export { loginRouter };