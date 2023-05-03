const express = require("express");

const {
  createProfile,
  getProfile,
  deleteProfile,
  updateProfile,
  deleteProfileByUserId,
} = require("../controllers/profileController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

//create user profile
router.post("/", createProfile);

//get user profile
router.get("/:id", getProfile);

//delete user profile
router.delete("/:id", deleteProfile);

//update user profile
router.patch("/:id", updateProfile);

//delete by user_id
router.delete("/deleteProfileByUserId/:id", deleteProfileByUserId);

module.exports = router;
