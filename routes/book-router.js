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

//PUT

bookRouter.put("/q", async(req, res) => {
    try{
        //getting info of existing data
        const bookInfo = await fs.readFile(
            path.join(cwd, "model/book.json"),
            "utf-8"
        );
        
        //extracting info from incoming http request
        const info = JSON.parse(bookInfo);
        const reqId = req.query.id;
        const reqTitle = req.body.title;
        const reqAuthor = req.body.author;
        const reqGenre = req.body.genre;
        const reqYear = req.body.year;
        const reqObj = info.find((i) => i.id === reqId);
        
        //checking if each data have values
        const title = reqTitle === undefined ? reqObj.title : reqTitle;
        const author = reqAuthor === undefined ? reqOnj.author : reqAuthor;
        const genre = reqGenre === undefined ? reqObj.genre : reqGenre;
        const year = reqYear === undefined ? reqObj.year : reqYear;
        
        //creating new Object with new data from user
        const newObj = {
            id: reqObj.id, 
            title : title,
            author : author,
            genre : genre,
            year : year
        };

        //create final object by replacing the new object
        const finalObj = info.map((item) => {
            if (item.id === reqId) {
                return newObj;
            }
            return item;
        });
        setTimeout(async ()=> {
            await fs.writeFile(
                path.join(cwd, "model/book.json"),
                JSON.stringify(finalObj, null, 2)
            );
        },1000)
        res.json({ message : "Success, Your changes were made! "})
    } catch (error) {
        console.log(error);
        res.status(500).end("Something went wrong");
    }
})


export { bookRouter };