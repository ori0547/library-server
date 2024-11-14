const express = require("express");
const { handleError } = require("../../utils/handleErrors");
const adminOnly = require("../../middlewares/adminOnlyMiddleware");
const auth = require("../../middlewares/authMiddleware");
const { getBook, getBooks } = require("../models/booksAccessDataService");
const { default: mongoose } = require("mongoose");

const booksController = express.Router();

booksController.patch("/book-list", async (req, res) => {
  try {
    const { bookIds } = req.body;
    const books = await Promise.all(
      bookIds.map(bookId => getBook(bookId))
    );

    res.send(books);
  } catch (error) {
    return handleError(res, error.status || 400, error.message);
  }
});

booksController.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await getBook(id);
    res.send(book);
  } catch (error) {
    return handleError(res, error.status || 400, error.message);
  }
});

booksController.get("/", async (req, res) => {
  try {
    const books = await getBooks();
    res.send(books);
  } catch (error) {
    return handleError(res, error.status || 400, error.message);
  }
});





module.exports = booksController;
