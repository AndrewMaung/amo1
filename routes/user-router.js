import express from "express";
import fs from "fs/promises";
import path from "path";
const cwd = process.cwd();

// set user router
const userRouter = express.Router();
// GET
// user request is http://localhost:port/user
userRouter.get("/", (_req, res) => {
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

userRouter.get("/q", async (req, res) => {
  try {
    const userInfo = await fs.readFile(path.join(cwd, "model/user.json"), "utf-8");
    const users = JSON.parse(userInfo)
    const id = req.query.id;
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

// POST
userRouter.post("/", async (req, res) => {
  try {
    const userInfo = await fs.readFile(
      path.join(cwd, "model/user.json"),
      "utf-8"
    );
    const info = JSON.parse(userInfo);
    const name = req.body.name;
    const username = req.body.username;
    const email = req.body.email;
    const userPost = {
      id: Date.now().toString(32),
      name: name,
      username: username,
      email: email,
    };
    const obj = JSON.stringify([...info, userPost], null, 2);
    setTimeout(async () => {
      await fs.writeFile(path.join(cwd, "model/user.json"), obj);
    }, 1000);
    res.json({ message: "Success!" });
  } catch (error) {
    console.log(error);
    res.status(500).end("Something went wrong");
  }
});

//PUT
userRouter.put("/q", async (req, res) => {
  try {
    const userInfo = await fs.readFile(
      path.join(cwd, "model/user.json"),
      "utf-8"
    );
    const info = JSON.parse(userInfo);
    const reqId = req.query.id;
    const reqName = req.body.name;
    const reqUsername = req.body.username;
    const reqEmail = req.body.email;
    const reqObj = info.find((i) => i.id === reqId);
    const name = reqName === undefined ? reqObj.name : reqName;
    const email = reqEmail === undefined ? reqObj.email : reqEmail;
    const username = reqUsername === undefined ? reqObj.username : reqUsername;
    const newObj = {
      id: reqObj.id,
      name: name,
      username: username,
      email: email,
    };
    const finalObj = info.map((item) => {
      if (item.id === reqId) {
        return newObj;
      }
      return item;
    });
    setTimeout(async () => {
      await fs.writeFile(
        path.join(cwd, "model/user.json"),
        JSON.stringify(finalObj, null, 2)
      );
    }, 1000);
    res.json({ message: "Success!" });
  } catch (error) {
    console.log(error);
    res.status(500).end("Something went wrong");
  }
});

//DELETE
userRouter.delete("/q", async (req, res) =>{
  try {
    const userInfo = await fs.readFile(
      path.join(cwd, "model/user.json"),
      "utf-8"
    );

    const info = JSON.parse(userInfo);
    const reqId = req.query.id;

    const finalObj = info.filter((item) => item.id !== reqId);

    await fs.writeFile(
      path.join(cwd, "model/user.json"),
      JSON.stringify(finalObj, null, 2)
    );

    res.json({ message : "Success! User Have Been Deleted!"});
  } catch (error) {
    console.log(error);
    res.status(500).end("Something went wrong");
  }
});


export { userRouter };
