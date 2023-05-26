const express = require("express");
require("dotenv").config({ path: "./.env" });

const socket = require("socket.io");
const cors = require("cors");
const cp = require("cookie-parser");
const app = express();
const http = require("http");
const server = http.createServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(cp());
app.use(express.static("client/build/"));
app.get("/user", async (req, res) => {
  try {
    const getUser = await user.find({});
    res.send({ getUser });
  } catch (e) {
    res.status(400).send(e);
  }
});

require("./db/config");
require("./routes/register")(app);
require("./routes/validate")(app);
require("./routes/request")(app);
require("./routes/respond")(app);
require("./routes/friends")(app);
require("./routes/allconv")(app);
require("./routes/getInfo")(app);
const getInfo = require("./routes/getInfo");
require("./routes/logout")(app);
require("./routes/search")(app);
require("./routes/view")(app);
require("./routes/message")(app);
getInfo(app);
const port = 3000; // Replace 3000 with your desired port number
server.listen(port, (e) => {
  console.log(`listening on ${port}...`);
});
const io = socket(server, {
  cors: {
    origin: "https://test-gchat.herokuapp.com/",
    methods: ["GET", "POST"],
  },
});

var user = [];
function addUser(usr) {
  if (user.findIndex((e) => e.uid == usr.uid) == -1) {
    user.push(usr);
  }
  console.log(user);
}
function removeUser(soc) {
  const idx = user.findIndex((e) => e.sid == soc);
  user.splice(idx, 1);
  console.log(user);
}
function findUser(userId) {
  const cu = user.find((e) => e.uid == userId);
  if (cu) {
    return cu.sid;
  } else {
    return null;
  }
}
io.on("connection", (sokt) => {
  console.log("a user connected, id  " + sokt.id);
  sokt.on("disconnect", (e) => {
    console.log("client disconnected  ");
    removeUser(sokt.id);
  });
  sokt.on("info", (v) => {
    addUser(v);
  });
  sokt.on("msg", (msg) => {
    console.log(msg);
    const socketId = findUser(msg.receiver);
    if (socketId) {
      io.to(socketId).emit("newmessage", msg);
    }
  });
});
