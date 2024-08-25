require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

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

let books = [
  {
    "id": 1,
    "name": "The Godfather",
    "genre": "Crime, Thriller",
    "author": "Mario Puzo",
    "description": "The Godfather is a classic novel that delves into the life of the Corleone family, an Italian-American mafia dynasty. The story follows the patriarch, Vito Corleone, and his youngest son, Michael, as they navigate the brutal world of organized crime in America. The novel explores themes of power, corruption, and family loyalty, highlighting the moral complexities involved in the pursuit of the American Dream."
  },
  {
    "id": 2,
    "name": "The Housemaid",
    "genre": "Psychological Thriller, Mystery",
    "author": "Freida McFadden",
    "description": "The Housemaid is a suspenseful novel that follows Millie Calloway, a young woman with a troubled past, who becomes a live-in housekeeper for the wealthy Winchester family. The story reveals the dark and twisted dynamics within the household, leading to shocking revelations and deadly consequences. It's a gripping tale of manipulation, obsession, and survival."
  },
  {
    "id": 3,
    "name": "It Ends with Us",
    "genre": "Contemporary Romance, Fiction",
    "author": "Colleen Hoover",
    "description": "It Ends with Us is a deeply emotional novel that tells the story of Lily Bloom, a young woman who finds herself in an abusive relationship while grappling with memories of her past. The book addresses difficult themes such as domestic violence and the complexities of love, making it both a heart-wrenching and inspiring read."
  },
  {
    "id": 4,
    "name": "A Good Girl's Guide to Murder",
    "genre": "Young Adult, Mystery, Thriller",
    "author": "Holly Jackson",
    "description": "A Good Girl's Guide to Murder is a thrilling young adult mystery that follows Pippa Fitz-Amobi, a high school student who reopens a closed murder case for her senior project. As she digs deeper into the case, she uncovers secrets that someone in her small town is desperate to keep hidden. The novel is filled with twists and turns, making it an engaging and suspenseful read."
  }
];

router.get("/", (req, res) => {
    res.send(books);
});

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    res.send(books.find(x => x.id === id));
});

router.post("/", (req, res)=> {
    console.log(req.user);
    if(!req.user.role || req.user.role != 'ADMIN') {
        return res.status(403).json({message: "Forbidden"});
    }
    const newBook = req.body;
    newBook.id = books.length + 1;
    books[books.length] = newBook;
    res.send(books[books.length-1]);
});

router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const updatedField = req.body;
    let book = books.find(x => x.id === id);
    if (!book) {
        return res.status(404).send('Book not found');
    }
    Object.keys(updatedField).forEach(key => {
    if (book.hasOwnProperty(key)) {
      book[key] = updatedField[key];
    }
  });
    res.send(book);
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const bookIndex = books.findIndex(x => x.id === id);
  if (bookIndex === -1) {
    return res.status(404).send('Book not found');
  }
  books.splice(bookIndex, 1);
  res.send(`Book with ID ${id} has been deleted.`);
  console.log(books);
});

module.exports = router;