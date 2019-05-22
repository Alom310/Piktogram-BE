const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/piktogram',
  { useNewUrlParser: true })

module.exports = {
  User: require("./User"),
  Post: require("./Post"),
  Comment: require("./Comment"),
  Like: require("./Like")
};
