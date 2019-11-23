module.exports = {
  validateUser
};

function validateUser(req, res, next) {
  if (!Object.keys(req.body).length) {
    res.status(401).json({ message: "Missing user data" });
  } else if (!req.body.username) {
    res.status(401).json({ message: "Missing required username" });
  } else if (!req.body.password) {
    res.status(401).json({ message: "Missing required password" });
  } else {
    next();
  }
}
