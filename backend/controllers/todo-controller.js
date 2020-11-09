const express = require("express");
const mongoose = require("mongoose");

const Todo = require("../models/todo-model");
const User = require("../models/user-model");

const addATodo = async (req, res, next) => {
  const { todoName, date, label } = req.body;
  const newTodo = new Todo({
    todoName,
    date,
    label,
    creator: req.userData.userId,
  });

  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    res.status(500).send("Adding todo failed, please try again");
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newTodo.save({ session: sess });
    user.todos.push(newTodo);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    res.status(500).send("Adding todo failed, please try again.2");
  }

  res.status(201).json({ newTodo });
};

const getTodosByUserId = async (req, res, next) => {
  const userId = req.params.userId;
  let user;
  try {
    user = await User.findById(userId).populate("todos");
    console.log(user);
  } catch (error) {
    res.status(500).send("Fetching todo failed, please try again.");
  }

  res.json({
    todo: user.todos.map((todo) => todo.toObject({ getters: true })),
    user: user.toObject({ getters: true }),
  });
};

exports.addATodo = addATodo;
exports.getTodosByUserId = getTodosByUserId;
