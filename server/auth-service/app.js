const express = require("express");
const authRoutes = require("./src/routes/authRoutes");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
import axios from "axios";

dotenv.config();

const app = express();
app.disable("x-powered-by");

app.get("/auth/google/callback", async (req, res) => {
  const code = req.query.code;

  try {
    const response = await axios.post("https://oauth2.googleapis.com/token", {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: "http://localhost:4000/auth/google/callback",
      grant_type: "authorization_code",
    });

    const { id_token, access_token } = response.data;

    // Decode user info
    const userInfo = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
    );

    console.log("Google User:", userInfo.data);

    // Register or login the user in your DB
    // Issue your app’s JWT
    const myJwt = generateJwt(userInfo.data);

    // Redirect back to frontend with your token
    res.redirect(`http://localhost:5173/register-success?token=${myJwt}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Google Authentication failed");
  }
});


app.listen(4000, () => console.log("Backend running on 4000"));

// Sessions (needed for passport)
app.use(session({
  secret: "supersecret", 
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.AUTH_SERVICE_PORT || 4000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN;

// CORS configuration for all routes
app.use(cors({
  origin: FRONTEND_ORIGIN,
  credentials: true,       
}));

// Handle preflight OPTIONS requests
app.options('*', cors({
  origin: FRONTEND_ORIGIN,
  credentials: true,
}));

// Security headers with helmet
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", FRONTEND_ORIGIN],
        styleSrc: ["'self'", FRONTEND_ORIGIN],
        connectSrc: ["'self'", FRONTEND_ORIGIN, 'http://localhost:4000'],
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
