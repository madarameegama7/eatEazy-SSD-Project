require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

//app.use(cors());
app.use(helmet());
app.disable("x-powered-by");

app.use(express.urlencoded({ extended: true }));

const services = {
  auth: process.env.AUTH_SERVICE_URL,
  restaurant: process.env.RESTAURANT_SERVICE_URL,
  orders: process.env.ORDER_SERVICE_URL,
  notifications: process.env.NOTIFICATION_SERVICE_URL,
  payments: process.env.PAYMENT_SERVICE_URL,
  delivery: process.env.DELIVERY_SERVICE_URL,
};

// Secure CORS configuration
const allowedOrigins = [
  "http://localhost:5173", // Development
];

// Apply secure CORS configuration
app.use(
  cors({
    // Validate the request origin against the allowed list
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        // Allow requests with trusted origins
        callback(null, true); // Request is allowed
      } else {
        callback(new Error("Not allowed by CORS.")); // Block untrusted origins
      }
    },
    // Restrict HTTP methods that can be used in cross-origin requests
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    // Restrict headers that can be sent by the client
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

//Add route handlers for robots.txt and sitemap.xml
app.get("/robots.txt", (req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.send("User-agent: *\nDisallow: /");
});

app.get("/sitemap.xml", (req, res) => {
  res.setHeader("Content-Type", "application/xml");
  res.send(
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n</urlset>'
  );
});

// Define a strict CSP policy
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://trusted.cdn.com"],
      styleSrc: ["'self'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:"],
      connectSrc: ["'self'"],
      frameAncestors: ["'self'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);

app.use(
  "/auth",
  createProxyMiddleware({
    target: services.auth,
    changeOrigin: true,
  })
);

app.use(
  "/restaurants",
  createProxyMiddleware({
    target: services.restaurant,
    changeOrigin: true,
  })
);

app.use(
  "/orders",
  createProxyMiddleware({
    target: services.orders,
    changeOrigin: true,
  })
);

app.use(
  "/notifications",
  createProxyMiddleware({
    target: services.notifications,
    changeOrigin: true,
  })
);

app.use(
  "/payments",
  createProxyMiddleware({
    target: services.payments,
    changeOrigin: true,
  })
);

app.use(
  "/delivery",
  createProxyMiddleware({
    target: services.delivery,
    changeOrigin: true,
  })
);

app.get("/", (req, res) => {
  res.send("API Gateway is running...");
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
});
