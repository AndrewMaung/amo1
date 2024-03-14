import express from "express";
import users from "../model/user.js";

// set user router
const userRouter = express.Router();

// user request is http://localhost:port/user
userRouter.get("/", (req, res) => {
  // try/cash for error handling

  try {
    const response =
      "<h1>Welcome from AMO Muskudo service  <p>&#128512;<p></h1>";

    res.json({ success: true, data: response });
  } catch (error) {
    console.log(error);
    res.status(500).end("Something went wrong");
  }
});

userRouter.get("/q", (req, res) => {
  try {
    const id = parseInt(req.query.id);
    const user = users.find((i) => i.id === id);
    const response = {
      name: user.name,
      username: user.username,
      email: user.email,
    };
    res.json({ success: true, data: response });
  } catch (error) {
    console.log(error);
    res.status(500).end("Something went wrong");
  }
});

export { userRouter };