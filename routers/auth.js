const { register, login } = require("../src/api");
const express = require("express");
const router = express.Router();

//user
router.post("/register", register);
router.post("/login", login);
module.exports = router;
