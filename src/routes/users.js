const express = require("express");
const router = express.Router();

//import des fonctions sur les routes
const createUserController = require("../controller/userController/createUserController");
const readUserController = require("../controller/userController/readUserController");
const readOneUserController = require("../controller/userController/readOneUserController");
const updateUserController = require("../controller/userController/updateUserController");
const deleteUserController = require("../controller/userController/deleteUserController");

/* POST : create a new user. */
router.post("/", createUserController);

/* GET : fetch all users . */
router.get("/", readUserController);

/* GET : fetch one user . */
router.get("/:id", readOneUserController);

/* PUT : update one user . */
router.put("/:id", updateUserController);

/* DELETE : delete one user . */
router.delete("/:id", deleteUserController);

module.exports = router;
