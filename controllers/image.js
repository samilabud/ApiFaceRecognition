//For references: https://clarifai.com/clarifai/main/models/face-detection

const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");
const stub = ClarifaiStub.grpc();
const metadata = new grpc.Metadata();

//config
const USER_ID = "2lidsf3yts0l";
const APP_ID = "samfacerecognition123456";
const MODEL_ID = "face-detection";

const config = require("../constants/config");
let apiKey = "";
if (
  process.env.NODE_ENV !== undefined &&
  process.env.NODE_ENV.indexOf("development") >= 0
) {
  apiKey = config.enviroments.development.apiclarifai;
} else {
  apiKey = process.env.API_CLARIFAI;
}

metadata.set("authorization", "Key " + apiKey);

const handleApiCall = (req, res) => {
  const IMAGE_URL = req.body.input;
  try {
    stub.PostModelOutputs(
      {
        user_app_id: {
          user_id: USER_ID,
          app_id: APP_ID,
        },
        model_id: MODEL_ID,
        inputs: [
          { data: { image: { url: IMAGE_URL, allow_duplicate_url: true } } },
        ],
      },
      metadata,
      (err, response) => {
        if (err) {
          throw new Error(err);
        }

        if (response.status.code !== 10000) {
          console.log(response, "response");
          throw new Error(
            "Post model outputs failed, status: " + response.status.description
          );
        }

        // Since we have one input, one output will exist here
        // const output = response.outputs[0];
        return res.json(response);
        // console.log("Predicted concepts:");
        // for (const concept of output.data.concepts) {
        //     console.log(concept.name + " " + concept.value);
        // }
      }
    );
  } catch (err) {
    res.status(404).json("Error calling Clarifai API" + err);
  }

  // app.models.initModel({id: Clarifai.FACE_DETECT_MODEL})
  // .then(generalModel => generalModel.predict(req.body.input))
  // .then(response=>res.json(response))
  // .catch(err=>("Error con Clarifai." + err));
};

const handleEntries = (req, res, db) => {
  const { id } = req.body;
  db("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => {
      if (entries.length) res.json(entries);
      else res.status(404).json("This user does not exist in our database.");
    });
};
module.exports = {
  handleEntries: handleEntries,
  handleApiCall: handleApiCall,
};
