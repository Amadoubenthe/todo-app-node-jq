


const Todo = require("../models/todo.model");

const addTodo = async (req, res) => {
  console.log("bagnan: ",req.body);
  
  try {
    const newTodo = await Todo({ ...req.body });
    await newTodo.save();
    res
      .status(200)
      .send({ message: "Todo posted successfully", todo: newTodo });
  } catch (error) {
    console.error("Error creating book", error);
    res.status(500).send({ message: "Failed to create todo" });
  }
};

const getTodos = async (req, res) => {
  try {
    const Todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200).send(Todos);
  } catch (error) {
    console.error("Error fetching todos", error);
    res.status(500).send({ message: "Failed to fetch todos" });
  }
};

const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      res.status(404).send({ message: "Todo not Found!" });
    }
    res.status(200).send(book);
  } catch (error) {
    console.error("Error fetching todo", error);
    res.status(500).send({ message: "Failed to fetch book" });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedTodo) {
      res.status(404).send({ message: "Todo is not Found!" });
    }
    res.status(200).send({
      message: "Todo updated successfully",
      book: updatedTodo,
    });
  } catch (error) {
    console.error("Error updating a todo", error);
    res.status(500).send({ message: "Failed to update a book" });
  }
};

const updateStatusTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedTodo) {
      res.status(404).send({ message: "Todo is not Found!" });
    }
    res.status(200).send({
      message: "Todo updated successfully",
      book: updatedTodo,
    });
  } catch (error) {
    console.error("Error updating a todo", error);
    res.status(500).send({ message: "Failed to update a book" });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      res.status(404).send({ message: "Todo is not Found!" });
    }
    res.status(200).send({
      message: "Todo deleted successfully",
      book: deletedTodo,
    });
  } catch (error) {
    console.error("Error deleting a todo", error);
    res.status(500).send({ message: "Failed to delete a todo" });
  }
};

module.exports = {
  addTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo
};
