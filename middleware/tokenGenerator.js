const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateToken(user) {
  const payload = {
    subject: user.user_id,
    username: user.username
  };

  const options = {
    expiresIn: "1d"
  };

  const result = jwt.sign(payload, process.env.SECRET, options);

  return result;
}

module.exports = generateToken;
