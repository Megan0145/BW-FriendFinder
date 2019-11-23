const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const users = require("../users/users-model");

const authRouter = require("../authentication/auth-router");
const usersRouter = require("../users/users-router");

const authenticate = require("../middleware/restricted")

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/users", authenticate, usersRouter);

server.get("/", (req, res) => {
  res.send("Welcome to Friend Finder API!");
});

server.get("/api/home", (req, res) => {
  users.findUsers()
  .then(users => {
    res.status(200).json(users)
  })
  .catch(err => {
    res.status(500).json(err)
  })
})

module.exports = server;
