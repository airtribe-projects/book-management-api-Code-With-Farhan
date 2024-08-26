require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log(`Connected to MongoDB`);
});

const bookRouter = require("./routes/books");
const userRouter = require("./routes/users");
app.use(express.json());
app.listen(process.env.PORT, () => {
    console.log("Listening");
})

app.get("/", (req, res) => {
    res.send("Hello world");
});

app.use("/api/books", bookRouter);
app.use("/api/users", userRouter);