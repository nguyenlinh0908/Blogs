const {
  createCategory,
  categories,
  createPost,
  posts,
  postByID,
  postsByCategory,
  deletePostByID,
  updatePostByID,
} = require("../src/api");
const { verifyToken } = require("../middleware/authentication");
const express = require("express");
const router = express.Router();
//category router
router.post("/category", createCategory);
router.get("/categories", categories);
//posts router
router.post("/post", verifyToken, createPost);
router.get("/posts", posts);
router.get("/post/:id", postByID);
router.get("/posts/category/:category", postsByCategory);
router.delete("/post/delete/:id", verifyToken, deletePostByID);
router.patch("/post/update/:id", verifyToken, updatePostByID);
module.exports = router;
