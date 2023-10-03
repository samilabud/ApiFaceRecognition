const Clarifai = require('clarifai');
//config
const config = require("../constants/config");
let apiKey = "";

if(process.env.NODE_ENV.indexOf("development")>=0){
    apiKey = config.enviroments.development.apiclarifai;
}else{
    apiKey = process.env.API_CLARIFAI
}
const app = new Clarifai.App({
    apiKey: apiKey
});
const handleApiCall = (req, res) => {
    app.models.initModel({id: Clarifai.FACE_DETECT_MODEL})
    .then(generalModel => generalModel.predict(req.body.input))
    .then(response=>res.json(response))
    .catch(err=>("Error con Clarifai." + err));
}


const handleEntries = (req, res, db) => {
    const {id} = req.body;

    console.log("al menos la llamo")
    db("users")
    .where("id","=",id)
    .increment("entries",1)
    .returning("entries")
    .then(entries=>{
        if(entries.length)
            res.json(entries)
        else
            res.status(404).json("Este usuario no existe")
    })
}
module.exports = {
    handleEntries : handleEntries,
    handleApiCall : handleApiCall
}