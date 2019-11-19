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

module.exports = router;
