const URL = {
  type: String,
  trim: true,
  lowercase: true,
  match: /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(\/\S*)?$/,
};

const EMAIL = {
  type: String,
  required: true,
  match: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/,
  lowercase: true,
  trim: true,
  unique: true,
};

const TEXT = {
  type: String,
  maxLength: 256,
  trim: true,
};

const REQUIRED_TEXT = {
  ...TEXT,
  required: true,
  minLength: 2,
};

const PHONE = {
  type: String,
  required: true,
  match: /0[0-9]{1,2}-?\s?[0-9]{3}\s?[0-9]{4}/,
};

const NAME = {
  first: REQUIRED_TEXT,
  middle: TEXT,
  last: REQUIRED_TEXT,
};



const ADDRESS = {
  state: TEXT,
  country: REQUIRED_TEXT,
  city: REQUIRED_TEXT,
  street: REQUIRED_TEXT,
  houseNumber: {
    type: Number,
    required: true,
    min: 1,
  },
  zip: { type: Number },
};
const TITLE = {
  type: String,
  required: true,
};
const SUMMARY = {
  type: String,
  required: true,
};
const DESCRIPTION = {
  type: String,
  required: true,
  minLength: 65,
};
const PRICE = {
  type: Number,
};



module.exports = { URL, EMAIL, TEXT, REQUIRED_TEXT, PHONE, NAME, ADDRESS, TITLE, SUMMARY, DESCRIPTION, PRICE };
