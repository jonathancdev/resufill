const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  temporary: {
    type: Boolean,
  },
});

//static signup method
userSchema.statics.signup = async function (user_info) {
  console.log(user_info);

  const { first_name, middle_name, last_name, profession, email, password } =
    user_info;

  //validation
  if (!first_name || !last_name || !profession || !email || !password) {
    throw Error("All required fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }
  const exists = await this.findOne({ email });
  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({
    first_name,
    middle_name,
    last_name,
    profession,
    email,
    password: hash,
  });
  return user;
};

//static temporary account signup method
userSchema.statics.signupTemp = async function (user_info) {
  const { first_name, middle_name, last_name, profession, password } =
    user_info;
  //validation
  if (!first_name || !last_name || !profession || !password) {
    throw Error("All required fields must be filled");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  //generate random 6 digit number
  const randomNumber = Math.floor(100000 + Math.random() * 900000);
  //count all accounts
  const count = await this.countDocuments();
  //set new email
  const email = `tempuser${randomNumber + count}@example.com`;

  //check email
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already in use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({
    first_name,
    middle_name,
    last_name,
    profession,
    email,
    password: hash,
    temporary: true,
  });
  return user;
};

//static login method
userSchema.statics.login = async function (email, password) {
  //validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("Incorrect email");
  }

  const match = await bcrypt.compare(password, user.password);
  console.log(match);

  if (!match) {
    throw Error("Incorrect password");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
