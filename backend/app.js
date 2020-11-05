const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
const User = require("./models/user-model");

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/signup", async (req, res, next) => {
  const { username, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    console.log("Signup failed.");
  }
  if (existingUser) {

  }
  const createdUser = new User({
    username,
    email,
    password,
    todos: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    console.log("Signup failed");
    console.log(err + "asdasdasd");
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      "todosaresecret",
      { expiresIn: "1h" }
    );
  } catch (err) {
    console.log("Signing up failed, please try again later.");
    console.log(err);
  }
  res.status(201).json({
    userId: createdUser.id,
    email: createdUser.email,
    token: token,
  });
});

mongoose
  .connect(
    `mongodb+srv://omerbkk06:19901992@cluster0.f6uwe.mongodb.net/todo?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("Database is connected!");
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server is running!");
    });
  })
  .catch((err) => {
    console.log(err);
  });
