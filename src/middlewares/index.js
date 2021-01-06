const jwt = require("jsonwebtoken");

exports.requireSignin = (req, res, next) => {
  // authorization === Bearer token-generate
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        return res.status(401).json({ error: "You must be logged In" });
      }
      if (payload) {
        req.user = payload;
      }
    });
  } else {
    return res.status(401).json({ error: "You must be logged In" });
  }
  next();
};
