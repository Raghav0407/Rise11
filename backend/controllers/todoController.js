const Todo = require('../models/Todo');

const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.userId });
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTodo = new Todo({
      title,
      description,
      userID:req.body.userid
    });
    await newTodo.save();
    res.status(201).json({ message: 'Todo created successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    await Todo.findByIdAndUpdate(id, { title, description });
    res.status(200).json({ message: 'Todo updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await Todo.findByIdAndDelete(id);
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };
