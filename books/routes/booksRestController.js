const express = require("express");
const { handleError } = require("../../utils/handleErrors");
const adminOnly = require("../../middlewares/adminOnlyMiddleware");
const auth = require("../../middlewares/authMiddleware");
const { getBook, getBooks, addBook, editBook, deleteBook } = require("../models/booksAccessDataService");

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

booksController.post("/", async (req, res) => {
  try {
    const book = req.body;
    const newBook = await addBook(book)
    if (!newBook) throw new Error("can't add book")
    res.send(newBook._id)
  } catch (error) {
    return handleError(res, error.status || 400, error.message);
  }
});

booksController.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = req.body;
    if (!newBook) throw new Error("can't edit book")
    res.send(newBook._id)
  } catch (error) {
    return handleError(res, error.status || 400, error.message);
  }
});

booksController.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteBook(id);
    res.send('OK');
  } catch (error) {
    return handleError(res, error.status || 400, error.message);
  }
});

module.exports = booksController;
