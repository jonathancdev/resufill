const express = require("express");

const {
  createPhoto,
  getPhoto,
  updatePhoto,
  clearPhoto,
  deletePhotoByUserId,
} = require("../controllers/photoController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

//create user photo
router.post("/", createPhoto);

//get user photo
router.get("/:id", getPhoto);

//clear user photo
router.patch("/remove/:id", clearPhoto);

//update user photo
router.patch("/:id", updatePhoto);

//delete by user_id
router.delete("/deletePhotoByUserId/:id", deletePhotoByUserId);

module.exports = router;
