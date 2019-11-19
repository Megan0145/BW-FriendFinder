const db = require("../data/db-config");

module.exports = {
  findUsers,
  findUserById
};

function findUsers() {
  return db("users");
}

function findUserById(id) {
  return db("users").where({ id }).first();
}
