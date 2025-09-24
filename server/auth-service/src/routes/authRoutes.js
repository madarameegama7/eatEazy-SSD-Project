const express = require('express');
const { register, login, refreshAccessToken, logout, getAllUsers, getUserById, updateUser, deleteUser, verifyToken, getAllDeliveryPerson} = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');
const router = express.Router();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");
const { JWT_SECRET } = require("../config/env");

// Configure Passport with Google strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/google/callback",
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user already exists
      let user = await UserModel.findUserByEmail(profile.emails[0].value);

      if (!user) {
        // If not, register new user with role = Customer by default
        user = await UserModel.createUser({
          firstname: profile.name.givenName,
          lastname: profile.name.familyName,
          email: profile.emails[0].value,
          passwordHash: null, // Google accounts don’t need password
          phone: "",
          role: "Customer",
        });
      }

      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

// Serialize/deserialize user for session
passport.serializeUser((user, done) => done(null, user.UserID));
passport.deserializeUser(async (id, done) => {
  const user = await UserModel.findUserById(id);
  done(null, user);
});

// Google login start
router.get("/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google callback
router.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Create JWT and send back to frontend
    const user = req.user;
    const token = jwt.sign(
      { id: user.UserID, email: user.Email, role: user.Role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Redirect to frontend with token
    res.redirect(`${process.env.FRONTEND_ORIGIN}/login?token=${token}`);
  }
);

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required.' });
    }

    try {
        const newAccessToken = await refreshAccessToken(refreshToken);
        res.json({ accessToken: newAccessToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

router.post('/logout', async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required for logout.' });
    }

    try {
        await logout(refreshToken);
        res.json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/users', authenticateToken, getAllUsers);
router.get('/drivers', getAllDeliveryPerson);
router.get('/users/:id', authenticateToken, getUserById);
router.put('/users/:id', authenticateToken, updateUser);
router.delete('/users/:id', authenticateToken, deleteUser);
router.post('/verify',verifyToken);

module.exports = router;
