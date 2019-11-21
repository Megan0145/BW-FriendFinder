const db = require("../data/db-config");

module.exports = {
  findUsers,
  findUserById,
  findReceivedMessagesByUserId,
  findSentMessagesByUserId,
  sendMessage,
  findUnansweredQuestionsByUserId,
  findAnsweredQuestions,
  findMatches,
  addAnswer,
  findQuestionAnswers
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
  return db("messages as m")
    .join("users as u", "m.receiver_id", "u.id")
    .select(
      "m.receiver_id",
      "u.username AS receiver_username",
      "m.message"
    )
    .where("m.sender_id", id);
}

function findUnansweredQuestionsByUserId(id) {
    return db
    .select('q.id as question_id', 'q.question as question')
    .from('questions as q')
    .leftJoin('user_answers as ua', function() {
      this.on('ua.question_id', 'q.id').on('ua.user_id', db.raw(id));
    })
    .whereNull('ua.user_id')
    .first();
}

function findAnsweredQuestions(id) {
  return db("user_answers as ua")
    .join("questions as q", "q.id", "ua.question_id")
    .join("answers as a", "ua.answer_id", "a.id")
    .select("ua.answer_id")
    .where("ua.user_id", id);
}

function findQuestionAnswers(id) {
    return db('question_answers')
      .where(
        'question_answers.question_id',
        db
          .select('q.id as question_id')
          .from('questions as q')
          .leftJoin('user_answers as ua', function() {
            this.on('ua.question_id', 'q.id').on('ua.user_id', db.raw(id));
          })
          .whereNull('ua.user_id')
          .first()
      )
      .join('answers', 'question_answers.answer_id', 'answers.id')
      .select('answers.*');
  }

function findMatches(id, matchCount) {
  return db.raw(`SELECT 
ouA.user_id AS potentialFriendID,
u.username,
count( * ) AS match_probability
FROM (
    SELECT ua.user_id,
           ua.question_id,
           ua.answer_id
      FROM user_answers AS ua
     WHERE ua.user_id = ${id}
)
AS liA
JOIN
(
    SELECT ua.user_id,
           ua.question_id,
           ua.answer_id
      FROM user_answers AS ua
     WHERE ua.user_id != ${id}
)
AS ouA ON liA.question_id = ouA.question_id AND 
          liA.answer_id = ouA.answer_id
          JOIN users as u on ouA.user_id = u.id
GROUP BY liA.user_id,
   ouA.user_id, u.username
HAVING count( * ) >= ${matchCount}
ORDER BY count( * ) DESC;`);
}

function addAnswer(answer) {
  return db("user_answers").insert(answer);
}
