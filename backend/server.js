const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data.js");
const connectDB = require("./config/db.js");


dotenv.config();
connectDB();
const app = express();

app.get("/", (req, res) => {
    res.send("API is running successfully");
});

app.get("/api/chat", (req, res) => {
    res.send(chats);
})

app.get("/api/chat/:id", (req, res) => {
    //console.log(req.params.id);
    const singleChats = chats.find((c) => c._id === req.params.id);
    res.send(singleChats);
});

const PORT = process.env.PORT || 5000; 

app.listen(5000, console.log(`Server Started on PORT ${PORT}`));

