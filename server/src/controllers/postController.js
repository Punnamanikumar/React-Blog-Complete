const Post = require("../models/Post");

// @desc    Get all posts (with pagination & optional category filter)
// @route   GET /api/posts?category=&page=&limit=
// @access  Public
const getAllPosts = async (req, res, next) => {
  try {
    const { category, page = 1, limit = 10, search } = req.query;
    const query = { isPublished: true };

    if (category) query.category = category.toLowerCase();
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Post.countDocuments(query);
    const posts = await Post.find(query)
      .populate("author", "name avatar")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .select("-content"); // content is heavy; exclude from list view

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
      posts,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single post by slug + increment view count
// @route   GET /api/posts/:slug
// @access  Public
const getPostBySlug = async (req, res, next) => {
  try {
    const post = await Post.findOneAndUpdate(
      { slug: req.params.slug, isPublished: true },
      { $inc: { views: 1 } },
      { new: true }
    ).populate("author", "name avatar");

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    res.status(200).json({ success: true, post });
  } catch (error) {
    next(error);
  }
};

// @desc    Get latest 3 posts per major category (for "You May Also Like")
// @route   GET /api/posts/latest
// @access  Public
const getLatestPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ isPublished: true })
      .sort({ createdAt: -1 })
      .limit(6)
      .select("title slug img category createdAt")
      .populate("author", "name");

    res.status(200).json({ success: true, posts });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new post
// @route   POST /api/posts
// @access  Admin only
const createPost = async (req, res, next) => {
  try {
    const { title, description, content, img, imgPublicId, category, tags } = req.body;

    const post = await Post.create({
      title,
      description,
      content,
      img,
      imgPublicId,
      category: category.toLowerCase(),
      tags,
      author: req.user._id,
    });

    res.status(201).json({ success: true, post });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Admin only
const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    const updated = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, post: updated });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Admin only
const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }
    await post.deleteOne();
    res.status(200).json({ success: true, message: "Post deleted successfully." });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle like on a post
// @route   PATCH /api/posts/:id/like
// @access  Authenticated users
const toggleLike = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    const userId = req.user._id.toString();
    const alreadyLiked = post.likes.map((id) => id.toString()).includes(userId);

    if (alreadyLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    } else {
      post.likes.push(req.user._id);
    }

    await post.save();

    res.status(200).json({
      success: true,
      liked: !alreadyLiked,
      likeCount: post.likes.length,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle bookmark (save/unsave) a post
// @route   PATCH /api/posts/:id/bookmark
// @access  Authenticated users
const toggleBookmark = async (req, res, next) => {
  try {
    const user = req.user;
    const postId = req.params.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    const isSaved = user.savedPosts.map((id) => id.toString()).includes(postId);

    if (isSaved) {
      user.savedPosts = user.savedPosts.filter((id) => id.toString() !== postId);
    } else {
      user.savedPosts.push(postId);
    }

    await user.save();

    res.status(200).json({
      success: true,
      bookmarked: !isSaved,
      message: isSaved ? "Post removed from bookmarks." : "Post saved to bookmarks.",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPosts,
  getPostBySlug,
  getLatestPosts,
  createPost,
  updatePost,
  deletePost,
  toggleLike,
  toggleBookmark,
};
