const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');
//local modules
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require("./controllers/image")

const db = knex({
    client: 'pg',
    connection: {
      host : 'localhost',
      user : 'postgres',
      password : '123456',
      database : 'facerecognitiondb'
    }
});  

const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json({extended:false}));
app.use(cors());

app.get("/",(req,res)=>{
   
    db.select("*").from("users")
    .returning("*")
    .then(users=>{
        if(users.length)
            res.json(users)
        else
            res.json("No hay usuarios en la base de datos");
    })
    .catch(err=>{res.json("Error buscando usuarios." + err)})
   
   
})

//login
app.post("/signin", signin.handleSignin(db, bcrypt));  //With advance function method
//Register
app.post("/register",(req,res)=>{register.handleRegister(req, res, db, bcrypt)}); //With normal function method

//Profile
app.get("/profile/:id",(req,res)=>{profile.handleProfile(req, res, db)});

//Entries
app.put("/image",(req,res)=>{image.handleEntries(req, res, db)});
app.post("/imageurl",(req,res)=>{image.handleApiCall(req, res)});

//Listening port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(process.env.WINDIR);
    console.log(`Servidor corriendo en puerto ${PORT}`);
})
