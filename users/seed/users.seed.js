const chalk = require("chalk");
const { registerUser, getUsers } = require("../models/usersAccessDataService");
const users = require("./users.json");

const seedUsers = async () => {
  const allUsers = await getUsers();

  if (!allUsers.length) {
    console.log(chalk.yellow("seeding users"));
    await Promise.all(users.map(registerUser));
    console.log(chalk.cyanBright("users seeded successfully"));
  }
};

module.exports = seedUsers;
