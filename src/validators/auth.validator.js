const { check, validationResult } = require("express-validator");

exports.validateSignupRequest = [
  check("firstName").notEmpty().withMessage("First name is required"),
  check("lastName").notEmpty().withMessage("Last name is required"),
  check("email").isEmail().withMessage("Valid Email is required"),
  check("password")
    .isLength({ min: 8 })
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
    .withMessage(
      "Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character."
    ),
];

exports.validateSigninRequest = [
  check("email").isEmail().withMessage("Valid Email is required"),
  check("password")
    .isLength({ min: 8 })
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
    .withMessage(
      "Please enter a password at least 8 character and contain At least one uppercase.At least one lower case.At least one special character."
    ),
];

exports.validatePost = [
  check("title").notEmpty().withMessage("Title is required"),
  check("description").notEmpty().withMessage("Description is required"),
];

exports.isRequestValidated = (req, res, next) => {
  const errorFormater = ({ msg }) => {
    return `${msg}`;
  };
  const result = validationResult(req).formatWith(errorFormater);
  const hasErrors = !result.isEmpty();
  if (hasErrors) {
    return res.status(400).json({
      errors: result.mapped(),
    });
  }
  next();
};
