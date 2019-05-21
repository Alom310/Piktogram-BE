const express = require("express");
const router = express.Router();
const controllers = require("../controllers");

router.put('/:id/update', controllers.user.update);
router.delete("/delete", controllers.user.delete);
router.get("/", controllers.user.show);

module.exports = router;