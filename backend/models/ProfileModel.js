const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//nested schema objects for profile schema
const User = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    middle_name: {
      type: String,
    },
    last_name: {
      type: String,
      required: true,
    },
    profession: {
      type: String,
      required: true,
    },
  },
  { id: false, _id: false }
);

const SocialSchema = new Schema(
  {
    partial_url: {
      type: String,
    },
    website: {
      type: String,
    },
    user_input: {
      type: String,
    },
  },
  { id: false, _id: false }
);

const ContactInformation = new Schema(
  {
    telephone: {
      type: Number,
    },
    email: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    links: [SocialSchema],
  },
  { id: false, _id: false }
);

const EducationSchema = new Schema(
  {
    institution: {
      type: String,
    },
    degree: {
      type: String,
    },
    description: {
      type: String,
    },
    end_date: {
      type: Date,
    },
  },
  { id: false, _id: false }
);

const ExperienceSchema = new Schema(
  {
    title: {
      type: String,
    },
    company: {
      type: String,
    },
    start_date: {
      type: Date,
    },
    end_date: {
      type: Date,
    },
    duties: [
      {
        type: String,
      },
    ],
  },
  { id: false, _id: false }
);

const profileSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    user: { type: User, required: true },
    user_profile: {
      type: String,
    },
    contact_information: {
      type: ContactInformation,
      required: true,
    },
    education: [EducationSchema],
    experience: [ExperienceSchema],
    skills: [
      {
        type: String,
      },
    ],
    temporary: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);
