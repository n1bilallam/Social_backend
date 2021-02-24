const Post = require("../models/posts.model");

exports.getAllPosts = (req, res) => {
  try {
    Post.find({})
      .populate({ path: "postedBy", select: "_id firstName lastName" })
      .exec((error, posts) => {
        if (error)
          return res
            .status(400)
            .json({ error: "Something went wrong plz try Refresh" });
        if (posts) {
          return res.status(200).json({ posts });
        }
      });
  } catch (error) {
    console.log(error);
  }
};
exports.createPost = (req, res) => {
  try {
    const { title, description } = req.body;
    const _post = new Post({
      title,
      description,
      postedBy: req.user._id,
    });
    _post.save((error, created) => {
      if (error)
        return res
          .status(400)
          .json({ error: "Something went wrong plz try again" });
      if (created) {
        return res.status(201).json({ message: "Created succssufly" });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.myPosts = (req, res) => {
  try {
    Post.find({ postedBy: req.user._id })
      .populate({ path: "postedBy", select: "_id firstName lastName" })
      .exec((error, posts) => {
        if (error)
          return res
            .status(400)
            .json({ error: "Something went wrong plz try Refresh" });
        if (posts) {
          return res.status(200).json({ posts });
        }
      });
  } catch (error) {
    console.log(error);
  }
};
