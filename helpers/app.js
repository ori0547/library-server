const express = require("express");
const usersController = require("./users/routes/usersRestController");
const connectToDb = require("./db/dbService");
const chalk = require("chalk");
const { handleError } = require("./utils/handleErrors");
const corsMiddleware = require("./middlewares/corsMiddleware");
const booksController = require("./books/routes/booksRestController");

const PORT = 8181;

const app = express();

app.use(corsMiddleware);
app.use(express.json());

app.use("/users", usersController);
app.use("/books", booksController);

app.use((req, res) => {
  return handleError(res, 404, "Path not found");
});

app.use((err, req, res, next) => {
  const message = err || "Internal error of the server";
  return handleError(res, 500, message);
});

app.listen(PORT, () => {
  console.log(chalk.yellow("app is listening to port " + PORT));
  connectToDb();
});
