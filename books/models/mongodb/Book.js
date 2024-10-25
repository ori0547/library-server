const mongoose = require("mongoose");
const { TITLE, SUMMARY, DESCRIPTION, PRICE, URL } = require("../../../helpers/mongodb/mongooseValidators");

const schema = new mongoose.Schema({
  title: TITLE,
  summary: SUMMARY,
  description: DESCRIPTION,
  price: PRICE,
  image: URL,
});

const Book = mongoose.model("book", schema);

module.exports = Book;
