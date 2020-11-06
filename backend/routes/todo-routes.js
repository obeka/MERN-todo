const express = require("express");

const router = express.Router();
const todoController = require("../controllers/todo-controller");
const auth = require("../middleware/auth-middleware")

router.post("/new", auth, todoController.addATodo);

module.exports = router;
