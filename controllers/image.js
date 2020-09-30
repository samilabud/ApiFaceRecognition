const Clarifai = require('clarifai');
const app = new Clarifai.App({
    apiKey: '531b1501937b46ce9504c24f406fd7e3'
});
const handleApiCall = (req, res) => {
    app.models.initModel({id: Clarifai.FACE_DETECT_MODEL})
    .then(generalModel => generalModel.predict(req.body.input))
    .then(response=>res.json(response))
    .catch(err=>("Error con Clarifai." + err));
}


const handleEntries = (req, res, db) => {
    const {id} = req.body;

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