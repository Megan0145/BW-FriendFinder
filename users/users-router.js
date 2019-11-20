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
    .findReceivedMessagesByUserId(req.params.id)
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
    .findSentMessagesByUserId(req.params.id)
    .then(messages => {
      res.status(200).json(messages);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Could not get sent messages: " + err.message });
    });
});

router.get("/:id/questions", (req, res) => {
  users
    .findUnansweredQuestionsByUserId(req.params.id)
    .then(questions => {
      if (!questions.length) {
        res
          .status(200)
          .json({ message: "You have no questions left to answer" });
      } else {
        res.status(200).json(questions);
      }
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Could not get questions: " + err.message });
    });
});

router.post("/:id/questions", (req, res) => {
  const user_id = req.params.id;
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
  const sender_id = req.params.id;
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
    .findMatches(req.params.id)
    .then(matches => {
      res.status(200).json(matches.rows);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "Could not get matches: " + err.message });
    });
});

module.exports = router;
