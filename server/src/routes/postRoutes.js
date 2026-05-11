const express = require("express");
const router = express.Router();
const {
  getAllPosts,
  getPostBySlug,
  getLatestPosts,
  createPost,
  updatePost,
  deletePost,
  toggleLike,
  toggleBookmark,
} = require("../controllers/postController");
const {
  getComments,
  addComment,
} = require("../controllers/commentController");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

// Public routes
router.get("/", getAllPosts);
router.get("/latest", getLatestPosts);
router.get("/:slug", getPostBySlug);

// Authenticated user routes
router.patch("/:id/like", protect, toggleLike);
router.patch("/:id/bookmark", protect, toggleBookmark);

// Comment routes (nested under posts)
router.get("/:postId/comments", getComments);
router.post("/:postId/comments", protect, addComment);

// Admin only routes
router.post("/", protect, adminOnly, createPost);
router.put("/:id", protect, adminOnly, updatePost);
router.delete("/:id", protect, adminOnly, deletePost);

module.exports = router;
