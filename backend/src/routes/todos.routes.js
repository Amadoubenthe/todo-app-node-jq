const express = require("express");
const {
 addTodo,
 getTodos,
 getTodoById,
 updateTodo,
 deleteTodo
} = require("../controllers/todos.controller");


const router = express.Router();

router.post("/", addTodo);
router.get("/", getTodos);
router.get("/:id", getTodoById);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
