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
    creator: req.userData.userId
  });

  let user;
  try {
    user = await User.findById(req.userData.userId);
    console.log(user);
  } catch (err) {
    res.status(500).send("Adding todo failed, please try again.")
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newTodo.save({ session: sess });
    user.todos.push(newTodo);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    res.status(500).send("Adding todo failed, please try againssss.")
  }

  res.status(201).json({ newTodo });
};

exports.addATodo = addATodo;
