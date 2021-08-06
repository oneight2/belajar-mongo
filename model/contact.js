const mongoose = require("mongoose");

const Contact = mongoose.model("Contact", {
  nama: {
    type: String,
    required: true,
  },
  nomor: {
    type: String,
    require: true,
  },
  email: {
    type: String,
  },
});

module.exports = Contact;
