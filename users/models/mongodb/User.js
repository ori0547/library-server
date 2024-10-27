const mongoose = require("mongoose");
const { PHONE, EMAIL, NAME, ADDRESS } = require("../../../helpers/mongodb/mongooseValidators");

const schema = new mongoose.Schema({
  name: NAME,
  phone: PHONE,
  email: EMAIL,
  password: { type: String, required: true, trim: true },
  address: ADDRESS,
  isAdmin: { type: Boolean, default: false },
  isBusiness: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
});

const User = mongoose.model("user", schema);

module.exports = User;
