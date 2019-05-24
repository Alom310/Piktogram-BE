const mongoose = require("mongoose");

Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now(),
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post"
  }
});

module.exports = mongoose.model("Comment", CommentSchema);
