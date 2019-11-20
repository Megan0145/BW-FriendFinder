const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

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

module.exports = server;
