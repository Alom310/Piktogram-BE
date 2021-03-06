const mongoose = require("mongoose");

Schema = mongoose.Schema;

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  avatar: {
    type: String
  },
  bio: {
    type: String
  },
  // following: [{
  //   type: Schema.Types.ObjectId,
  //   ref: "User"
  // }],
  // followers: [{
  //   type: Schema.Types.ObjectId,
  //   ref: "User"
  // }]
  following: [{
    username: {
      type: String,
      ref: "User"
    }
  }],
  followers: [{
    username: {
      type: String,
      ref: "User"
    }
  }]
});

UserSchema.set("toJSON", {
  transform: function (doc, ret, opt) {
    delete ret["password"];
    return ret;
  }
});

UserSchema.index({
  username: "text"
})

module.exports = mongoose.model("User", UserSchema);
