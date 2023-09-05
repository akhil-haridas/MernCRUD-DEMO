const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

router.post("/createuser", UserController.createUser);
router.get("/allusers", UserController.getAllUsers);
router.put("/updateuser", UserController.updateUser);
router.get("/user/:id", UserController.getUser);
router.delete("/removeuser/:id",UserController.removeUser);
router.get("/countries", UserController.getCountries);
router.get("/states/:id", UserController.getStates);
router.get("/cities/:id", UserController.getCities);
router.get("/languages", UserController.getLanguages);
router.get('/create',UserController.create)
module.exports = router;
