const mongoose = require("mongoose");

Schema = mongoose.Schema;

const PostSchema = new Schema({
  fileName: {
    type: String,
    required: false
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
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  comments: [{
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    content: {
      type: String
    },
    date: {
      type: Date,
      default: Date.now(),
      required: true
    }
  }],
  likes: [{
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    like: Boolean
  }],
});

module.exports = mongoose.model("Post", PostSchema);
