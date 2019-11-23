const db = require("../data/db-config");

module.exports = {
  findUserById,
  addUser,
  findUserByUsername
};

function addUser(user) {
  return db("users")
    .insert(user, "id")
    .then(ids => {
      return findUserById(ids[0]);
    });
}

function findUserById(id) {
  return db("users").where({ id }).first();
}

function findUserByUsername(username) {
    return db("users").where({ username }).first();
}
