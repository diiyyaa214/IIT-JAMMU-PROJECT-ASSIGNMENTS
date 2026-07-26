const express = require("express");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("./config/Passport");

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());

app.use(passport.session());

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

module.exports = app;