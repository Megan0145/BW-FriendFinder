const db = require("../data/db-config");

module.exports = {
  findUsers,
  findUserById,
  findMessagesByUserId
};

function findUsers() {
  return db("users");
}

function findUserById(id) {
  return db("users").where({ id }).first();
}

// SELECT m.id AS message_id,
//        m.receiver_id AS receiver_id,
//        u.id AS sender_id,
//        u.username AS sender_username,
//        m.message
//   FROM messages AS m
//        JOIN
//        users AS u ON m.sender_id = u.id
//  WHERE m.receiver_id = 1;
function findMessagesByUserId(id) {
    return db("messages as m")
    .join("users as u", "m.sender_id", "u.id")
    .select("m.id AS message_id", "m.receiver_id AS receiver_id", " u.id AS sender_id", "u.username AS sender_username", "m.message")
    .where("m.receiver_id", id)
}
