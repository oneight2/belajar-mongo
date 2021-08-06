const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://syarif:7september@cluster0.bbflo.mongodb.net/WPU?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
);
