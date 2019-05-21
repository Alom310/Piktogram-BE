const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const ig = require("instagram-node").instagram();

const userRoutes = require("./routes/user.js");
const postRoutes = require("./routes/post");
const likeRoutes = require("./routes/like");
const commentRoutes = require("./routes/comment");


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(cors());

app.get('/', (req, res) => {
  res.send('test');
})

app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/likes", likeRoutes);
app.use("/comments", commentRoutes);

ig.use({
    client_id: "9acb7ddc5f4d47178844c1faf0907acd",
    client_secret: "f77a4a4fd3c141128fcf3ded6310610d"
});

const redirectUri = "https://localhost:3000/redirect";

app.get('/authorize', function(req, res){
    // set the scope of our application to be able to access likes and public content
    res.redirect(ig.get_authorization_url(redirectUri, { scope : ['public_content','likes']}) );
});

app.listen(process.env.PORT || 3001, () =>
  console.log("Server is now running")
);