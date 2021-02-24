const express = require("express");
const {
  createPost,
  getAllPosts,
  myPosts,
} = require("../controllers/posts.controller");
const { requireSignin } = require("../middlewares");
const {
  validatePost,
  isRequestValidated,
} = require("../validators/auth.validator");

const router = express.Router();

router.post(
  "/createpost",
  requireSignin,
  validatePost,
  isRequestValidated,
  createPost
);

router.get("/getallposts", getAllPosts);
router.get("/myposts", requireSignin, myPosts);

module.exports = router;
