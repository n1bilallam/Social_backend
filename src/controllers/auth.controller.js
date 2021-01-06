const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateJWTToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
exports.signup = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(async (error, user) => {
      if (error) {
        return res
          .status(400)
          .json({ message: "User Alerady exist with that email" });
      }
      const { firstName, lastName, email, password } = req.body;
      const hash_password = await bcrypt.hash(password, 12);
      const _user = new User({
        firstName,
        lastName,
        email,
        hash_password,
      });
      _user.save((error, user) => {
        if (error) return res.status(400).json({ error });
        if (user) {
          const token = generateJWTToken(user._id);
          return res.status(201).json({
            token,
            message: `Welcome ${fullName} Thanks for joins us`,
          });
        }
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(async (user) => {
      if (!user)
        return res
          .status(400)
          .json({ message: "Email or Password incorrect, Try agin" });

      if (user) {
        const isPassword = await user.authanticate(req.body.password);
        if (isPassword) {
          const token = generateJWTToken(user._id);
          const { fullName } = user;
          return res.status(200).json({
            token,
            message: `Welcome again ${fullName}`,
          });
        } else {
          return res.status(400).json({
            message: "Email or Password incorrect, Try agin",
          });
        }
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
