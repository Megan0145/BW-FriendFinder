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

module.exports = router;
