const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Id is automatically created by MongoDB, so not needed to be defined here
const movieSchema = new Schema({
  name: String,
  genre: String,
  directorId: String,
});

// Creates a model
// The model is used to interact with the director collection
// Collection AND model name is e.g. Movie, as defined here
// A model is always based on a certain schema, e.g. movieSchema
// PS a collection has documents, so instances of that collection or model
module.exports = mongoose.model("Movie", movieSchema);
