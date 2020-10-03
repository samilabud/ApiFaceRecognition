const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require('knex');
//local modules
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require("./controllers/image");

console.log(process.env.DATABASE_URL);
const db = knex({
    client: 'pg',
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    }
});  

// const db = knex({
//     client: 'pg',
//     connection: {
//       host : 'ec2-52-72-65-76.compute-1.amazonaws.com',
//       user : 'hebreteefqaskl',
//       port: '5432',
//       password : 'c7a3583c749988f7cce07d8c0dbe1fd06325b34a42f1b5ba86a085ea73c4000e',
//       database : 'd21vlb7jdff9se'
//     }
// });  


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
    .catch(err=>{res.json("Error buscando usuarios." + err + " ---- " + process.env.DATABASE_URL)})
   
   
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
