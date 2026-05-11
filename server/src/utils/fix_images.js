require("dotenv").config({ path: require("path").join(__dirname, "../../.env") });
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const Post = require("../models/Post");

const fixImages = async () => {
  try {
    await connectDB();
    console.log("Fixing broken Unsplash images...");

    const posts = await Post.find({});
    
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      if (post.img && post.img.includes("unsplash.com")) {
        // Generate a deterministic, reliable random image based on the post ID
        post.img = `https://picsum.photos/seed/${post._id}/800/500`;
        await post.save();
      }
    }

    console.log(`✅ Fixed images for ${posts.length} posts!`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to fix images:", error);
    process.exit(1);
  }
};

fixImages();
