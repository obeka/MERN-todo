const express = require("express");

const router = express.Router();
const todoController = require("../controllers/todo-controller");
const auth = require("../middleware/auth-middleware")

router.get("/:userId", todoController.getTodosByUserId);
router.post("/new", auth, todoController.addATodo);
router.post("/delete/:todoId", auth, todoController.addATodo);

module.exports = router;
