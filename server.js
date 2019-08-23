const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require('path')
require('dotenv').config()



const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");
const likeRoutes = require("./routes/like");
const resourcesRoutes = require("./routes/resources");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.use(cors());



app.use((req, res, next) => {
  // console.log('request header or x token', req.headers['x-token'])
  // check the header of the req
  // console.log('inside the check')
  if (req.headers['token'] === undefined) {
    console.log("there is no header");
    res.locals.userData = null;
    next();
  } else {
    jwt.verify(req.headers['token'], 'bWF0dGJyYW5kb25qb2VjaHJpc3RpbmE=', function (err, decoded) {
      if (err) {
        console.log('jwt verify errors')
        res.locals.userData = null;
        next();
      } else {
        console.log('decode here', decoded)
        res.locals.userData = decoded
        next();
      }

    });
  }

});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/build/index.html'));
})

app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/likes", likeRoutes);
app.use("/comments", commentRoutes);
app.use("/resources", resourcesRoutes);


app.listen(process.env.PORT || 3001, () =>
  console.log("Server is now running")
);

app.timeout = 1000;
