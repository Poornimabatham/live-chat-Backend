const express = require('express');
const path = require('path');
const app = express();

//socket io boilder plate
const http = require('http');
const socket = require('socket.io');

const server = http.createServer(app);
const io = socket(server)
//socket io boilder plate

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
io.on("connection", (socket) => {
    socket.on("send-location", (data) => {
        io.emit("receive-location", {id: socket.id, ...data});
    })
    console.log("connected");
})
app.get("/", (req, res) => {
    res.render("index");
})
server.listen(3000, () => {
    console.log("Server is running on port 3000");
})