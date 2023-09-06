const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

// User-related routes
router.post("/users", UserController.createUser);
router.get("/users", UserController.getAllUsers);
router.get("/users/:id", UserController.getUser);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.removeUser);

// Location-related routes
router.get("/countries", UserController.getCountries);
router.get("/states/:id", UserController.getStates);
router.get("/cities/:id", UserController.getCities);

// Language-related routes
router.get("/languages", UserController.getLanguages);

module.exports = router;
