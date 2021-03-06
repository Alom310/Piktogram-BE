const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const controllers = require("../controllers");
const multer = require('multer');
const uid = require('uid');

// ORIGINAL FILE UPLOAD///////////////////
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     let ext = file.originalname.substr(file.originalname.lastIndexOf('.') + 1);
//     cb(null, uid(10) + '.' + ext);
//   }
// })
// const upload = multer({ storage: storage });
/////////////////////////////////////////////

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
const imageFilter = function (req, file, cb) {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: imageFilter })

const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: 'josephlbaker',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

router.get("/", controllers.post.index);
router.get("/:id", controllers.post.getOnePost);
router.post("/createpost", upload.single('image'), controllers.post.createPost);
router.delete("/:id/deletepost", controllers.post.deletePost);

router.put("/:id/updatepost", controllers.post.updatePost);
router.put("/:id/addcomment", controllers.post.addComment);
// router.put("/addcomment", (req,res)=>{
//   console.log('xxxxxxxx')
// });




router.use((req, res, next) => {
  // console.log('cahnges');
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerHeader = bearer[1];
    req.token = bearerToken;
    let verified = jwt.verify(req.token, "bWF0dGJyYW5kb25qb2VjaHJpc3RpbmE=");
    console.log("Verified ", verified);
    req.userId = verified._id;
    next();
  } else {
    // console.log('forbidden')
    res.sendStatus(403);
  }
});


module.exports = router;
