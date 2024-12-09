const User = require("../../users/models/mongodb/User");
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

const deleteBook = async (bookId) => {
  try {
    const users = await User.find({ favorites: bookId });
    const favorites = users.map((user) => {
      user.favorites = user.favorites.filter((book) => book._id != bookId);
      return user.save();
    });

    await Promise.all(favorites);
    await Book.findByIdAndDelete(bookId);
  } catch (error) {
    createError("Mongoose", error);
  }
}

module.exports = { getBook, getBooks, addBook, editBook, deleteBook };
