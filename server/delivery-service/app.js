const express = require("express");
const cors = require("cors");
const logger = require("../delivery-service/src/config/logger");
const deliveryRoutes = require("./src/routes/DeliveryRoutes");

const app = express();
app.use(cors());
app.use(express.json());
require("dotenv").config();

app.use("/", deliveryRoutes);

const PORT = process.env.PORT || 4005;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`, app);
  console.log(`Server is running on port ${PORT}`);
});
