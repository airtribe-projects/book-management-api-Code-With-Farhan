require("dotenv").config();
const express = require('express');
const app = express();
const bookRouter = require("./routes/books");
app.use(express.json());
app.listen(process.env.PORT, () => {
    console.log("Listening");
})

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.use("/api/books", bookRouter);