const chalk = require("chalk");
const { addBook, getBooks } = require("../models/booksAccessDataService");
const books = require("./books.json");

const seedBooks = async () => {
  const allBooks = await getBooks();

  if (!allBooks.length) {
    console.log(chalk.yellow("seeding books"));
    await Promise.all(books.map(addBook));
    console.log(chalk.cyanBright("books seeded successfully"));
  }
};

module.exports = seedBooks;
