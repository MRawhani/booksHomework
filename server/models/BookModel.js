const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    max: [128, "Too long, max is 128 characters"]
  },
  author: {
    type: String,
    required: true,
    max: [128, "Too long, max is 128 characters"]
  },
  publisher: {
    type: String,
    required: true,
    max: [128, "Too long, max is 128 characters"]
  },
 
});

module.exports = mongoose.model("bookModel", bookSchema);
