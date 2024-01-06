const express = require("express");
const requireAuth = require("../middleware/requireAuth");

const {
  addUser,
  deleteUser,
  editUser,
  getAllUsers, 
  getUser
} = require("../controllers/userDataController");
const { handleApiError } = require("../middleware/errorHandling");

const router = express.Router();

router.use(requireAuth);

router.get("/getAllUsers", getAllUsers);
router.post("/addUser", addUser);
router.delete("/deleteUser/:id", deleteUser);
router.put("/editUser/:id", editUser);
router.get("/getUser/:id",getUser);
router.use(handleApiError);

module.exports = router;
