import express from "express";
import fs from "fs/promises";
import path from "path";
const cwd = process.cwd();

//set book router
const bookRouter = express.Router();
//GET
//book request is http://localhost:port/book
bookRouter.get("/",(req,res) => {
    //try/catch for error handling

try{
    const response = 
    "<h1>Welcome from AMO Book service <p>&#128512;<p></h1>";

    res.json({ success : true, data: response});
} catch(error) {
    console.log(error);
    res.status(500).end("Something went wrong");
}
});

bookRouter.get("/q", (req, res) => {
    try{
        const id = parseInt(req.query.id);
        const book = books.find((i) => i.id === id);
        const response = {
            title: book.title,
            author: book.author,
            genre: book.genre,
            year: book.year,
        };
        res.json({ success: true, data: response});
    } catch (error) {
        console.log(error);
        res.status(500).end("Something went wrong");
    }
});

//POST
bookRouter.post("/", async (req, res) => {
    try{
        const bookInfo = await fs.readFile(
            path.join(cwd, "model/book.json"),
            "utf-8"
        );
        const info = JSON.parse(bookInfo);
        const title = req.body.title;
        const author = req.body.author;
        const genre = req.body.genre;
        const year = req.body.year;
        const bookPost = {
            id: Date.now().toString(32),
            title : title,
            author : author,
            genre : genre,
            year : year,
        };
        const obj = JSON.stringify([...info, bookPost], null, 2);
        setTimeout(async () => {
            await fs.writeFile(path.join(cwd, "model/book.json"), obj);
        }, 1000);
        res.json({message: "Success!!"});
    }
    catch(error) {
        console.log(error);
        res.status(500).end("Something went wrong");
    }
});


export { bookRouter };