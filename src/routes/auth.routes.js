const express = require("express");
const { signup, signin } = require("../controllers/auth.controller");
const { requireSignin } = require("../middlewares");
const {
  isRequestValidated,
  validateSignupRequest,
  validateSigninRequest,
} = require("../validators/auth.validator");

const router = express.Router();

router.post("/signup", validateSignupRequest, isRequestValidated, signup);
router.post("/signin", validateSigninRequest, isRequestValidated, signin);
router.get("/test", requireSignin, (req, res) => {
  res.status(200).send("Hello middlware");
});

module.exports = router;
