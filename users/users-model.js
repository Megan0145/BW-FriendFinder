const db = require("../data/db-config");

module.exports = {
  findUsers,
  findUserById,
  findReceivedMessagesByUserId,
  sendMessage
};

function findUsers() {
  return db("users");
}

function findUserById(id) {
  return db("users")
    .where({ id })
    .first();
}

function findReceivedMessagesByUserId(id) {
  return db("messages as m")
    .join("users as u", "m.sender_id", "u.id")
    .select(
      "m.receiver_id AS receiver_id",
      " u.id AS sender_id",
      "u.username AS sender_username",
      "m.message"
    )
    .where("m.receiver_id", id);
}

function sendMessage(message) {
  return db("messages").insert(message);
}

function findSentMessagesByUserId(id) {
    
}
