const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const controllers = require("../controllers");

router.get("/", controllers.user.index);
router.post("/login", controllers.user.login);
router.post("/signup", controllers.user.signup);
router.put('/:id/update', controllers.user.update);
router.get("/search", controllers.user.search);
router.get("/myprofile", controllers.user.myProfile);
// router.get("/profile", controllers.user.profile);

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
