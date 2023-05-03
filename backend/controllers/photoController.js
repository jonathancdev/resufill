const Photo = require("../models/PhotoModel");
const Profile = require("../models/ProfileModel");
const mongoose = require("mongoose");

//create a profile
const createPhoto = async (req, res) => {
  const { user_photo, user_id, temporary } = req.body;
  console.log(typeof user_photo);
  try {
    const photo = await Photo.create({
      user_photo,
      user_id,
      temporary,
    });
    res.status(200).json(photo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get a Photo
const getPhoto = async (req, res) => {
  console.log("params", req.params);
  const { id } = req.params;
  const photo = await Photo.findOne({ user_id: id });
  if (!photo) {
    return res.status(400).json({ error: "No user photo found" });
  }
  return res.status(200).json(photo);
};

//update a Photo
const updatePhoto = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Photo found" });
  }
  if (!req.body.user_photo) {
    return res.status(404).json({ error: "Error uploading file" });
  }
  if (!req.body.user_photo.includes("data:image")) {
    return res.status(404).json({ error: "Invalid file type" });
  }
  const photo = await Photo.findOneAndUpdate(
    { user_id: id },
    {
      user_photo: req.body.user_photo,
    },
    { new: true }
  );
  if (!photo) {
    return res.status(404).json({ error: "No Photo found" });
  }
  res.status(200).json(photo);
};

const clearPhoto = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Photo found" });
  }
  const photo = await Photo.findOneAndUpdate(
    { user_id: id },
    {
      user_photo: "",
    },
    { new: true }
  );
  if (!photo) {
    return res.status(404).json({ error: "No Photo found" });
  }
  res.status(200).json(photo);
};

//delete a photo document by user document id
const deletePhotoByUserId = async (req, res) => {
  //id will be user_id, not _id of photo document
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No photo found" });
  }
  const photo = await Photo.findOneAndDelete({ user_id: id });
  if (!photo) {
    return res.status(404).json({ error: "No photo found" });
  }
  res.status(200).json(photo);
};

module.exports = {
  createPhoto,
  getPhoto,
  deletePhoto,
  updatePhoto,
  clearPhoto,
  deletePhotoByUserId,
};
