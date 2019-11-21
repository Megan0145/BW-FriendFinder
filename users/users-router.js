const router = require("express").Router();
const users = require("./users-model");

//Gets all users
router.get("/", (req, res) => {
  users
    .findUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({ message: "Could not get users: " + err.message });
    });
});

//Gets current logged in user
router.get("/current", (req, res) => {
  users
    .findUserById(req.decodedToken.subject)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(401).json({ message: "Could not find user" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Could not get user: " + err.message });
    });
});

router.put("/current", (req, res) => {
  const changes = req.body;
  users
    .updateUser(req.decodedToken.subject, changes)
    .then(user => {
      res
        .status(200)
        .json({ message: "User updated successfully!", changes, user });
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Could not update user: " + err.message });
    });
});

//User messages
router.get("/messages", (req, res) => {
  users
    .findReceivedMessagesByUserId(req.decodedToken.subject)
    .then(messages => {
      res.status(200).json(messages);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Could not get messages: " + err.message });
    });
});

router.post("/messages", (req, res) => {
  const sender_id = req.decodedToken.subject;
  const { receiver_id, message } = req.body;
  const messageBody = { sender_id, receiver_id, message };
  users
    .sendMessage(messageBody)
    .then(() => {
      res.status(200).json({ message: "Message sent successfully" });
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Could not send message: " + err.message });
    });
});

router.get("/messages/sent", (req, res) => {
  users
    .findSentMessagesByUserId(req.decodedToken.subject)
    .then(messages => {
      res.status(200).json(messages);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Could not get sent messages: " + err.message });
    });
});

//User questions
router.get("/questions", async (req, res) => {
  try {
    const question = await users.findUnansweredQuestionsByUserId(
      req.decodedToken.subject
    );
    const answers = await users.findQuestionAnswers(req.decodedToken.subject);
    const result = { ...question, answers };
    res.json(result);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Could not get questions: " + err.message });
  }
});

router.post("/questions", (req, res) => {
  const user_id = req.decodedToken.subject;
  const { question_id, answer_id } = req.body;
  const answer = { user_id, question_id, answer_id };
  users
    .addAnswer(answer)
    .then(success => {
      res.status(201).json({ message: "Answer submitted", answer });
    })
    .catch(err => {
      res.status(500).json({ message: "Cannot submit answer: " + err.message });
    });
});

//User matches
router.get("/matches", (req, res) => {
  const matchCount = req.body.matchCount || 1;
  users
    .findMatches(req.decodedToken.subject, matchCount)
    .then(matches => {
      if (process.env.DB_ENV === "production") {
        res.status(200).json(matches.rows);
      } else {
        res.status(200).json(matches);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Could not get matches: " + err.message });
    });
});

module.exports = router;
