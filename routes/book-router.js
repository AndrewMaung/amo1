import express from "express";
import books from "../model/book.js";

//set book router
const bookRouter = express.Router();

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


export { bookRouter };