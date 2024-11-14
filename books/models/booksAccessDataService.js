const { createError } = require("../../utils/handleErrors");
const Book = require("./mongodb/Book");



const getBook = async (bookId) => {
  try {
    return await Book.findById(bookId);
  } catch (error) {
    createError("Mongoose", error);
  }
};

const getBooks = async () => {
  try {
    return await Book.find()
  } catch (error) {
    createError("Mongoose", error);
  }
}
const addBook = async (book) => {
  try {
    return await Book.create(book)
  } catch (error) {
    createError("Mongoose", error);
  }
}

const editBook = async (bookId, book) => {
  try {
    return await Book.findByIdAndUpdate(
      bookId,
      book,
      { new: true }
    );
  } catch (error) {
    createError("Mongoose", error);
  }
}





module.exports = { getBook, getBooks, addBook, editBook };
