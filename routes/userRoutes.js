const express = require("express");
const { loginUser, signupUser } = require("../controllers/userController");
const {
  handleApiError,
  handleLoginError,
} = require("../middleware/errorHandling");

const router = express.Router();

router.post("/loginUser", loginUser);
router.post("/signupUser", signupUser);

router.use(handleLoginError);

module.exports = router;
