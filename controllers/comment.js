const db = require("../models");

module.exports = {
  index: (res) => {
    db.Comment.find({})
      .populate("user")
      .exec((err, foundComments) => {
        if (err) return console.error(err);
        res.json(foundComments);
      });
  },
  createComment: (req, res) => {
    let newComment = new db.Comment({
      content: req.body.content,
      user: req.body.user,
      timestamp: req.body.date
    });
    db.Comment.create(newComment, (err, newCommentCreated) => {
      if (err) return console.log(err);
      res.json(newCommentCreated);
    });
  },

  deleteComment: (req, res) => {
    let commentId = req.params.id;
    console.log(commentId)
    db.Comment.findOneAndDelete({ _id: commentId }, (err, foundComment) => {
      if (err) return console.log(err);
      console.log(foundComment);
      res.json(foundComment);
    });
  },
  updateComment: (req, res) => {
    let commentId = req.body._id;
    console.log(commentId);
    db.Comment.findOneAndUpdate(
      { _id: commentId },
      req.body,
      { new: true },
      (err, updatedComment) => {
        if (err) return console.log(err);
        console.log(updatedComment);
        res.json(updatedComment);
      }
    );
  }
};
