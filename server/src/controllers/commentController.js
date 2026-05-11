const Comment = require("../models/Comment");
const Post = require("../models/Post");

// @desc    Get all comments for a post
// @route   GET /api/posts/:postId/comments
// @access  Public
const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate("author", "name avatar")
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, comments });
  } catch (error) {
    next(error);
  }
};

// @desc    Add a comment to a post
// @route   POST /api/posts/:postId/comments
// @access  Authenticated users
const addComment = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    const comment = await Comment.create({
      post: req.params.postId,
      author: req.user._id,
      body: req.body.body,
    });

    const populated = await comment.populate("author", "name avatar");

    res.status(201).json({ success: true, comment: populated });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a comment (author or admin)
// @route   DELETE /api/comments/:id
// @access  Authenticated (own comment) or Admin
const deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    const isOwner = comment.author.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Not authorized to delete this comment." });
    }

    await comment.deleteOne();
    res.status(200).json({ success: true, message: "Comment deleted." });
  } catch (error) {
    next(error);
  }
};

module.exports = { getComments, addComment, deleteComment };
