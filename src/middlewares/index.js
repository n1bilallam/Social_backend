const jwt = require("jsonwebtoken");

exports.requireSignin = (req, res, next) => {
  // authorization === Bearer token-generate
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) {
        return res.status(401).json({ error: "You must be logged In" });
      }
    });
    req.user = user;
  } else {
    return res.status(401).json({ error: "You must be logged In" });
  }
  next();
};
