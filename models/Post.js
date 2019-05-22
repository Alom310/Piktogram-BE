const mongoose = require("mongoose");

Schema = mongoose.Schema;

const PostSchema = new Schema({
  filePath: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now(),
    required: true
  },
  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  },
  like: {
    type: Schema.Types.ObjectId,
    ref: "Like"
  },
});

module.exports = mongoose.model("Post", PostSchema);
