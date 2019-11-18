const db = require("../data/db-config");

module.exports = {
  findById,
  add,
  findByUsername
};

function add(user) {
  return db("users")
    .insert(user)
    .then(ids => {
      return findById(ids[0]);
    });
}

function findById(id) {
  return db("users").where({ User_id, id});
}

function findByUsername(username) {
    return db("users").where({ username }).first();
}
