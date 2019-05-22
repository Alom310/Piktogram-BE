const db = require("../models");

module.exports = {
  index: (req, res) => {
    db.Like.find({})
      .populate("user")
      .exec((err, foundLikes) => {
        if (err) return console.error(err);
        res.json(foundLikes);
      });
  },
  addLike: (req, res) => {
    let newLike = new db.Like({
      user: req.body.user,
      like: req.body.like
    });

    db.Like.create(newLike, (err, newLikeCreated) => {
      if (err) return console.log(err);
      res.json(newLikeCreated);
    });
  },
  deleteLike: (req, res) => {
    let likeId = req.params.id;
    db.Like.findOneAndDelete({ _id: likeId }, (err, foundLike) => {
      if (err) return console.log(err);
      console.log(foundLike);
      res.json(foundLike);
    });
  }
};
