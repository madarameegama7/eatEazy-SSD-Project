const express = require("express");
const authRoutes = require("./src/routes/authRoutes");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const axios = require("axios");

dotenv.config();

const app = express();
app.disable("x-powered-by");

// Sessions (needed for passport)
app.use(
  session({
    secret: "supersecret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.AUTH_SERVICE_PORT || 5002;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN;
const { GOOGLE_AUTH_REDIRECT } = process.env;

// CORS configuration for all routes
app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
  })
);

// Handle preflight OPTIONS requests
app.options(
  "*",
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
  })
);

// Security headers with helmet
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", FRONTEND_ORIGIN, GOOGLE_AUTH_REDIRECT],
        styleSrc: ["'self'", FRONTEND_ORIGIN, GOOGLE_AUTH_REDIRECT],
        connectSrc: [
          "'self'",
          FRONTEND_ORIGIN,
          GOOGLE_AUTH_REDIRECT,
          `http://localhost:${PORT}`,
          "http://localhost:4000",
        ],
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"],
      },
    },
  })
);


// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", authRoutes);

app.get("/", (req, res) => {
  res.send("Auth Service is running!");
});


app.listen(PORT, () => {
  console.log(`Auth Service is running on port ${PORT}`);
});
