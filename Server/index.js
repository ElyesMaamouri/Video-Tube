const express = require("express");
const dotenv = require("dotenv");
// Load config
dotenv.config();
const app = express();
const http = require("http");
const cors = require("cors");
const errorHandler = require("errorhandler");
const helmet = require("helmet");
const expressSession = require("express-session");
const cookieSession = require("cookie-session");

const passport = require("passport");
const server = http.Server(app);
const port = 4000;
require("./src/config/passport")(passport);

// Connecting to the database
require("./src/config/dataBase")();

app.use(
  cookieSession({
    name: "session",
    keys: ["googlelogin"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(
  expressSession({
    secret: process.env.KEY_SESSION,
    resave: false,
    saveUninitialized: false,
  })
);

// '*' cross-orgin header
app.use(cors());
//Session

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
//Route API

require("./src/api/routes/authGoogle")(app);

server.listen(port, (err) => {
  if (err) throw logger.error("the server is not running !! " + PORT);
  console.log(`** the server is running on port ${port} **`);
});
