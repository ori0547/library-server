const mongoose = require("mongoose");
const { PHONE, EMAIL, NAME, IMAGE, ADDRESS } = require("../../../helpers/mongodb/mongooseValidators");

const schema = new mongoose.Schema({
  name: NAME,
  phone: PHONE,
  email: EMAIL,
  password: { type: String, required: true, trim: true },
  // image: IMAGE,
  address: ADDRESS,
  isAdmin: { type: Boolean, default: false },
  isBusiness: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("user", schema);

module.exports = User;
