const express = require("express");
const dotenv = require("dotenv");
const app = express();
const http = require("http");
const cors = require("cors");
const errorHandler = require("errorhandler");
const helmet = require("helmet");
const session = require("express-session");
const server = http.Server(app);
const port = process.env.PORT || 4000;
// Load config
dotenv.config();
// Connecting to the database
require("./src/config/dataBase")();

// '*' cross-orgin header
app.use(cors());
//Session
app.use(
  session({
    secret: process.env.KEY_SESSION,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, OPTIONS, DELETE");

  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(errorHandler());

// app.get("/", (req, res) => {
//   res.send("Hello World!!!");
// });

server.listen(port, (err) => {
  if (err) throw logger.error("the server is not running !! " + PORT);
  console.log(`** the server is running on port ${port} **`);
});
