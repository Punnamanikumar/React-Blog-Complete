const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Post title is required"],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Short description is required"],
    },
    content: {
      type: String,
      required: [true, "Post content is required"],
    },
    img: {
      type: String,
      default: "",
    },
    imgPublicId: {
      type: String, // Cloudinary public_id for deletion
      default: "",
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["tollywood", "technology", "jobs", "nature"],
      lowercase: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: [{ type: String, lowercase: true }],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Auto-generate slug from title before saving
postSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  }
  next();
});

// Virtual: like count
postSchema.virtual("likeCount").get(function () {
  return this.likes ? this.likes.length : 0;
});


postSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Post", postSchema);
