const mongoose = require("mongoose");

Schema = mongoose.Schema;

const LikeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  like: {
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model("Like", LikeSchema);
