const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const controllers = require("../controllers");
const multer = require('multer');
const uid = require('uid');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    let ext = file.originalname.substr(file.originalname.lastIndexOf('.') + 1);
    cb(null, uid(10) + '.' + ext);
  }
})
const upload = multer({ storage: storage });

router.get("/", controllers.user.index);
router.post("/login", controllers.user.login);
router.post("/signup", upload.single('image'), controllers.user.signup);
router.put('/:id/update', controllers.user.update);
router.get("/search", controllers.user.search);
router.get("/myprofile", controllers.user.getMyProfile);
router.get("/profile", controllers.user.getProfile);

router.use((req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    let verified = jwt.verify(req.token, "bWF0dGJyYW5kb25qb2VjaHJpc3RpbmE=");
    console.log("Verified ", verified);
    req.userId = verified._id;
    next();
  } else {
    res.sendStatus(403);
  }
});

router.delete("/delete", controllers.user.delete);



module.exports = router;
