const express = require("express");
const router = express.Router();
const controllers = require("../controllers");

router.get('/images/:name', controllers.resources.images);

module.exports = router;
