const express = require("express");
//controller functions
const {
  loginUser,
  signupUser,
  deleteUser,
  signupTempUser,
} = require("../controllers/userController");
const router = express.Router();

//login route
router.post("/login", loginUser);

//signup route
router.post("/signup", signupUser);

//delete route
router.delete("/:id", deleteUser);

//temporary account route
router.post("/tempaccount", signupTempUser);

module.exports = router;
