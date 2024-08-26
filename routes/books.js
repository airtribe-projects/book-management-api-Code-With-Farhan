require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Books = require("../models/books");
const verifyToken = (req, res, next) => {
    const header = req.headers;
    const token = header.authorization;
    if(!token) {
        res.status(401).json({message: "No token"});
    }
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    if(decodedToken.userName) {
        req.user = decodedToken;
        next();
    }
    else {
        res.status(401).json({message: "Unauthorized"});
    }
};

router.use(verifyToken);

// let books = [
//   {
//     "id": 1,
//     "name": "The Godfather",
//     "genre": "Crime, Thriller",
//     "author": "Mario Puzo",
//     "description": "The Godfather is a classic novel that delves into the life of the Corleone family, an Italian-American mafia dynasty. The story follows the patriarch, Vito Corleone, and his youngest son, Michael, as they navigate the brutal world of organized crime in America. The novel explores themes of power, corruption, and family loyalty, highlighting the moral complexities involved in the pursuit of the American Dream."
//   },
//   {
//     "id": 2,
//     "name": "The Housemaid",
//     "genre": "Psychological Thriller, Mystery",
//     "author": "Freida McFadden",
//     "description": "The Housemaid is a suspenseful novel that follows Millie Calloway, a young woman with a troubled past, who becomes a live-in housekeeper for the wealthy Winchester family. The story reveals the dark and twisted dynamics within the household, leading to shocking revelations and deadly consequences. It's a gripping tale of manipulation, obsession, and survival."
//   },
//   {
//     "id": 3,
//     "name": "It Ends with Us",
//     "genre": "Contemporary Romance, Fiction",
//     "author": "Colleen Hoover",
//     "description": "It Ends with Us is a deeply emotional novel that tells the story of Lily Bloom, a young woman who finds herself in an abusive relationship while grappling with memories of her past. The book addresses difficult themes such as domestic violence and the complexities of love, making it both a heart-wrenching and inspiring read."
//   },
//   {
//     "id": 4,
//     "name": "A Good Girl's Guide to Murder",
//     "genre": "Young Adult, Mystery, Thriller",
//     "author": "Holly Jackson",
//     "description": "A Good Girl's Guide to Murder is a thrilling young adult mystery that follows Pippa Fitz-Amobi, a high school student who reopens a closed murder case for her senior project. As she digs deeper into the case, she uncovers secrets that someone in her small town is desperate to keep hidden. The novel is filled with twists and turns, making it an engaging and suspenseful read."
//   }
// ];

router.get("/", async(req, res) => {
    const books = await Books.find(); 
    res.send(books);
});

router.get("/:id", async(req, res) => {
    const id = req.params.id;
    console.log(id);
    const book = await Books.findById(id);
    console.log(book);
    if(book) {
        return res.json(book);
    }
    res.status(403).json({message: "Book not found"});
});

router.post("/", (req, res)=> {
    console.log(req.user);
    if(!req.user.role || req.user.role != 'ADMIN') {
        return res.status(403).json({message: "Forbidden"});
    }
    const {name, genre, author, description} = req.body;
    const newBook = new Books({name, genre, author, description});
    newBook.save().then(()=> { return res.send({message: "book added successfully"})}).catch(err => res.send(err))
});

router.put("/:id", async(req, res) => {
    const id = req.params.id;
    const updatedFields = req.body;
    const book = await Books.findByIdAndUpdate(id, updatedFields, {
        new: true,
        runValidators: true
    });
    if (!book) {
        return res.status(404).send('Book not found');
    }
    res.send(book);
});

router.delete('/:id', async(req, res) => {
  const id = req.params.id;
  const book = await Books.findByIdAndDelete(id);
  if (!book) {
    return res.status(404).send('Book not found');
  }
  res.send(`Book with ID ${id} has been deleted.`);
  console.log(books);
});

module.exports = router;