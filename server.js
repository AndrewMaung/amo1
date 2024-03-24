import express from "express";
import path from "node:path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import { userRouter } from "./routes/user-router.js";
import { bookRouter } from "./routes/book-router.js";

const app = express();
const port = 5678;
const host = "localhost";
// cxreate __dirname for es6
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* express  built-in  middlewares*/
// serve ststic
app.use(express.static(path.join(__dirname, "public")));
// body-parser
// parses incoming requests with JSON payloads
app.use(express.json());
//  parses incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: false }));

// custom middleware for some browser actions
app.use((req, res, next) => {
  if (req.url.endsWith("?%20[sm]")) {
    res.writeHead(302, {
      Location: req.url.replace("?%20[sm]", ".map"),
    });
    res.end();
    return;
  }

  if (req.url.endsWith("/")) {
    req.url += "index.html";
  } else {
    req.url = req.url.replace(/\.html$/, "");
  }

  next();
});

const userFilePath = path.join(__dirname, "model", "user.json");

app.post("/login", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

   
    const userData = await fs.readFile(userFilePath, "utf-8");
    const users = JSON.parse(userData);

    const user = users.find((user) => user.username === username);

    if (!user) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

    if (user.password !== password) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }
   
    res.redirect("/success_login.html");
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// user router middleware
app.use("/user", userRouter);

//book router middleware
app.use("/book", bookRouter);

app.listen(port, () =>
  console.log(`Server listening on port http://${host}:${port}`)
);



