const express = require("express");
const { signup, signin, signout } = require("../controllers/auth.controller");

const {
  isRequestValidated,
  validateSignupRequest,
  validateSigninRequest,
} = require("../validators/auth.validator");

const router = express.Router();

router.post("/signup", validateSignupRequest, isRequestValidated, signup);
router.post("/signin", validateSigninRequest, isRequestValidated, signin);
router.post("/signout", signout);

module.exports = router;
