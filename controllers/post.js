const db = require("../models");
const multer = require('multer');
const cloudinary = require('cloudinary');


module.exports = {
  index: (req, res) => {
    db.Post.find({})
      .populate("comment")
      .populate("post")
      .populate("user")
      .exec((err, foundPosts) => {
        if (err) return console.error(err);
        res.json(foundPosts);
      });
  },
  createPost: (req, res) => {
    cloudinary.uploader.upload(req.file.path, function (result) {
      // add cloudinary url for the image to the image object under image property
      req.body.image = result.secure_url;
      // add user to image
      // req.body.user = res.locals.userData._id;

      let newPost = new db.Post({
        fileName: req.body.image,
        description: req.body.description,
        timestamp: req.body.date,
        user: res.locals.userData._id
      });

      db.Post.create(newPost, (err, newPostCreated) => {
        if (err) return console.log(err);
        res.json(newPostCreated);
      });
    });
    ///////////// ORIGINAL FUNCTION////////////
    // console.log(req.file);
    // let newPost = new db.Post({
    //   fileName: req.file.filename,
    //   description: req.body.description,
    //   timestamp: req.body.date,
    //   user: res.locals.userData._id
    // });

    // db.Post.create(newPost, (err, newPostCreated) => {
    //   if (err) return console.log(err);
    //   res.json(newPostCreated);
    // });
    /////////////////////////////////////////////
  },

  deletePost: (req, res) => {
    let postId = req.params.id;
    db.Post.findOneAndDelete({ _id: postId }, (err, foundPost) => {
      if (err) return console.log(err);
      console.log(foundPost);
      res.json(foundPost);
    });
  },

  getOnePost: (req, res) => {
    let postId = req.params.id;
    db.Post.findOne({ _id: postId }, (err, foundPost) => {
      if (err) return console.log(err);
      console.log(foundPost);
      res.json(foundPost);
    });
  },

  updatePost: (req, res) => {
    let postId = req.params.id;
    console.log(postId);
    db.Post.findOneAndUpdate(
      { _id: postId },
      req.body,
      { new: true },
      (err, updatedPost) => {
        if (err) return console.log(err);
        console.log(updatedPost);
        res.json(updatedPost);
      }
    );
  },
  addComment: (req, res) => {
    console.log('inside comment' + res.locals.userData._id)
    console.log(req.body);
    console.log('username' + res.locals.userData.username);
    if (res.locals.userData === null) {
      res.json({ 'message': "invalid request" })
    } else {
      db.Post.findByIdAndUpdate(req.params.id,
        {
          $push: {
            comments: {
              userId: res.locals.userData._id,
              username: res.locals.userData.username,
              content: req.body.content
            }
          }
        },
        { safe: true, upsert: true },
        function (err, doc) {
          if (err) {
            console.log(err);
          } else {
            console.log(doc);
          }
        }
      );
    }
  },

  like: (req, res) => {
    let postId = req.body.postId;
    db.Post.update(
      { _id: postId },
      {
        $push: {
          likes: {
            userId: res.locals.userData._id,
            like: req.body.like
          }
        }
      },
      (err, data) => {
        res.json(data);
      }
    )
  }
};
