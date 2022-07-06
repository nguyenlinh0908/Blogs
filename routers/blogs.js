const {
  createCategory,
  categories,
  createPost,
  posts,
  postByID,
  searchPostsByKey,
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
router.post("/search", searchPostsByKey);
router.get("/posts", posts);
router
  .route("/post/:id")
  .get(postByID)
  .patch(verifyToken, updatePostByID)
  .delete(verifyToken, deletePostByID);
router.get("/posts/category/:category", postsByCategory);
module.exports = router;
