const Profile = require("../models/ProfileModel");
const mongoose = require("mongoose");

//create a profile
const createProfile = async (req, res) => {
  const {
    user_id,
    user,
    photo,
    user_profile,
    contact_information,
    education,
    experience,
    skills,
    temporary,
  } = req.body;

  try {
    const profile = await Profile.create({
      user_id,
      user,
      photo,
      user_profile,
      contact_information,
      education,
      experience,
      skills,
      temporary,
    });
    res.status(200).json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//get a profile
const getProfile = async (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const profile = await Profile.findOne({ user_id: id });
  res.status(200).json(profile);
};

//delete a profile
const deleteProfile = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No profile found" });
  }
  const profile = await Profile.findOneAndDelete({ _id: id });
  if (!profile) {
    return res.status(404).json({ error: "No profile found" });
  }
  res.status(200).json(profile);
};

//update a profile
const updateProfile = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No profile found" });
  }
  const profile = await Profile.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true }
  );
  if (!profile) {
    return res.status(404).json({ error: "No profile found" });
  }
  res.status(200).json(profile);
};

//delete profile by user id
const deleteProfileByUserId = async (req, res) => {
  //id will be user_id, not _id of profile document
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No profile found" });
  }
  const profile = await Profile.findOneAndDelete({ user_id: id });
  if (!profile) {
    return res.status(404).json({ error: "No profile found" });
  }
  res.status(200).json(profile);
};

module.exports = {
  createProfile,
  getProfile,
  deleteProfile,
  updateProfile,
  deleteProfileByUserId,
};
