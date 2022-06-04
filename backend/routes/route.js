const express = require("express");
const router = express.Router();
const authorController = require("../controllers/userController");

const middleWare = require("../middleware/auth")

router.post("/createUser", authorController.createUser)
router.post("/loginUser", authorController.login)
router.get("/getUser", middleWare.auth, authorController.getUserData)

module.exports = router;