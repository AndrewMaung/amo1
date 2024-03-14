import express from "express";
import path from "node:path";
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

// user router middleware
app.use("/user", userRouter);

//book router middleware
app.use("/book", bookRouter);

app.listen(port, () =>
  console.log(`Server listening on port http://${host}:${port}`)
);



