const router = require("express").Router();
const users = require("./users-model");

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

router.get("/:id", (req, res) => {
  users
    .findUserById(req.params.id)
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

router.get("/:id/messages", (req, res) => {
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

router.get("/:id/messages/sent", (req, res) => {
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

router.get("/:id/questions", async (req, res) => {
  try {
    const question = await users.findUnansweredQuestionsByUserId(req.decodedToken.subject);
    const answers = await users.findQuestionAnswers(req.decodedToken.subject);
    const result = { ...question, answers };
    res.json(result);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'Could not get questions: ' + err.message });
  }
});

router.post("/:id/questions", (req, res) => {
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

router.post("/:id/messages", (req, res) => {
  const sender_id = req.decodedToken.subject;
  const { receiver_id, message } = req.body;
  const messageBody = { sender_id, receiver_id, message }
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

router.get("/:id/matches", (req, res) => {
  users
    .findMatches(req.decodedToken.subject)
    .then(matches => {
      if(process.env.DB_ENV === 'production') {
        res.status(200).json(matches.rows);
      } else {
        res.status(200).json(matches)
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Could not get matches: " + err.message });
    });
});

module.exports = router;
