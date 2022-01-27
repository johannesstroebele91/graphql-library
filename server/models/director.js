const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Id is automatically created by MongoDB, so not needed to be defined here
const directorSchema = new Schema({
  name: String,
  age: Number,
});

// Creates a model
// The model is used to interact with the director collection
// Collection AND model name is e.g. Movie, as defined here
// A model is always based on a certain schema, e.g. movieSchema
// PS a collection has documents, so instances of that collection or model
module.exports = mongoose.model("Director", directorSchema);
